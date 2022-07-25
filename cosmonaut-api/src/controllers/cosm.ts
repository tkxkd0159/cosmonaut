import { existsSync } from "fs";
import path from "path";
import { cosm, getUid } from "@d3lab/services";
import { APIError, CosmAns } from "@d3lab/types";
import {
    saveCodeFiles,
    lodeCodeFiles,
    asyncUtil,
    sleep
} from "@d3lab/utils";
import {
    getAssetLoc,
    setAssetLoc,
    getProgress,
    setProgress,
    getChapterThreshold,
} from "@d3lab/models/cosm";

const cosminit = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    const isBuild = req.body.needBuild;

    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);
    await cosm.checkProjOrder(req, lesson, chapter);

    if (!isBuild) {
        if (chapter === 1) {
            await setAssetLoc(req, "start");
        } else {
            await setAssetLoc(req, "doing");
        }
        res.sendStatus(200)
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
        return next(new APIError(400, "the project was already generated"))
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

    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);
    const chLimit = await getChapterThreshold(lesson);
    if (chapter === chLimit) {
        await setAssetLoc(req, "done");
        await setProgress(req, lesson, 0);
        await setProgress(req, lesson+1, 1);
    } else {
        await setProgress(req, lesson, chapter + 1);
    }
    const p = await getProgress(req, lesson);
    res.json(p)
})

const cosmDiff = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);

    res.locals.threshold = await getChapterThreshold(lesson);
    if (chapter === res.locals.threshold) {
        return next();
    } else {
        if (true) {
            await setProgress(req, lesson, chapter + 1);
            res.json({ status: "success" });
        }
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
        return next(new Error("This chapter does not exist on you"));
    }
    await saveCodeFiles(req.body["files"], srcpath);

    const data = await cosm.Run("cosm-build", uid, lesson, chapter);
    const parsedData = data.trim().split('\n')

    let isSuccess = true;
    const out = []
    for (let d of parsedData) {
        const res: CosmAns = JSON.parse(d)
        if (res.result !== "success") {
            isSuccess = false;
        }
        out.push(res)
    }
    if (isSuccess === true) {
        if (chapter === res.locals.threshold) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            await setProgress(req, lesson+1, 1);
        } else {
            await setProgress(req, lesson, chapter + 1);
        }
    }

    res.json({result: out})

});

const cosmLoadCodes = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.query.lesson);
    const chapter = Number(req.query.chapter);

    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);

    const srcpath = cosm.getCosmFilePath(
        req.app.locals.cargoPrefix,
        uid,
        lesson,
        chapter,
        true
    );
    if (!existsSync(srcpath)) {
        return next(new Error("This chapter does not exist on you"));
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
