import { existsSync } from "fs";
import path from "path";
import { cosm, getUid } from "@d3lab/services";
import { APIError, CosmAns } from "@d3lab/types";
import { saveCodeFiles, lodeCodeFiles, asyncUtil, sleep } from "@d3lab/utils";
import {
    getAssetLoc,
    setAssetLoc,
    getProgress,
    setProgress,
    getChapterThreshold,
} from "@d3lab/models/cosm";
import {
    diffAns
} from "@d3lab/models/diff"

const cosminit = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    const isBuild = req.body.needBuild;

    if (!isBuild) {
        if (chapter === 1) {
            await setAssetLoc(req, "start");
        } else {
            await setAssetLoc(req, "doing");
        }
        res.sendStatus(200);
    }

    const genfilePath = path.join(
        cosm.getCosmFilePath(
            req.app.locals.cargoPrefix,
            uid,
            lesson,
            chapter,
            true
        ),
        "lib.rs"
    );

    if (existsSync(genfilePath)) {
        throw new APIError(400, "the project was already generated");
    }

    await cosm.Run("cosm-init", uid, lesson, chapter);
    await sleep(1000);
    if (existsSync(genfilePath)) {
        res.json({ isGen: true });
    } else {
        res.json({ isGen: false });
    }
});

const readDone = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    let prog = await getProgress(req, lesson)
    const chLimit = await getChapterThreshold(lesson);
    if (prog.chapter !== 0) {
        if (chapter === chLimit) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            await setProgress(req, lesson + 1, 1);
        } else {
            await setProgress(req, lesson, chapter + 1);
        }
        prog = await getProgress(req, lesson);
    }
    res.json(prog);
});

const cosmDiff = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    const subchapter = Number(req.body.subchapter);

    const prog = await getProgress(req, lesson)
    const chThreshold = await getChapterThreshold(lesson);
    if (prog.chapter !== 0 && req.body.isLast === true) {
        if (chapter === chThreshold) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            await setProgress(req, lesson + 1, 1);
        } else {
            await setProgress(req, lesson, chapter + 1);
        }
    }
    const ans = diffAns[lesson][chapter][subchapter]
    if (ans !== undefined) {
        res.json(ans)
    } else {
        throw new APIError(400, "Your subchapter is wrong")
    }
});

const cosmBuild = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    const srcpath = cosm.getCosmFilePath(
        req.app.locals.cargoPrefix,
        uid,
        lesson,
        chapter,
        true
    );
    if (!existsSync(srcpath)) {
        throw new Error("This chapter does not exist on you");
    }
    await saveCodeFiles(req.body["files"], srcpath);

    const data = await cosm.Run("cosm-build", uid, lesson, chapter);
    const parsedData = data.trim().split("\n");

    let isSuccess = true;
    const out = [];
    for (let d of parsedData) {
        const res: CosmAns = JSON.parse(d);
        if (res.result !== "success") {
            isSuccess = false;
        }
        out.push(res);
    }
    const prog = await getProgress(req, lesson)
    if (isSuccess === true && (prog.chapter !== 0)) {
        const chThreshold = await getChapterThreshold(lesson);
        if (chapter === chThreshold) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            await setProgress(req, lesson + 1, 1);
        } else {
            await setProgress(req, lesson, chapter + 1);
        }
    }

    res.json({ result: out });
});

const cosmLoadCodes = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.query.lesson);
    const chapter = Number(req.query.chapter);
    cosm.checkTarget(lesson, chapter);

    const srcpath = cosm.getCosmFilePath(
        req.app.locals.cargoPrefix,
        uid,
        lesson,
        chapter,
        true
    );
    if (!existsSync(srcpath)) {
        throw new Error("This chapter does not exist on you");
    }

    const files = await lodeCodeFiles(srcpath);
    res.json(files);
});

const getLessonPicture = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.query.lesson);
    await cosm.checkLessonRange(lesson);
    let assetSuffix = await getAssetLoc(req);
    const assetPath = path.join(process.cwd(), assetSuffix);
    res.sendFile(assetPath);
});

const userProgress = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.query.lesson);
    let p;
    if (!isNaN(lesson)) {
        await cosm.checkLessonRange(lesson);
        p = await getProgress(req, lesson);
    } else {
        p = await getProgress(req);
    }
    res.json(p);
});

export {
    cosminit,
    readDone,
    cosmDiff,
    cosmBuild,
    cosmLoadCodes,
    getLessonPicture,
    userProgress,
};
