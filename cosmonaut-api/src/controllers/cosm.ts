import { existsSync } from "fs";
import path from "path";
import { cosm, getUid } from "@d3lab/services";
import { APIError, CosmAns } from "@d3lab/types";
import { saveCodeFiles, lodeCodeFiles, asyncUtil, sleep } from "@d3lab/utils";
import { getAssetLoc, setAssetLoc, getProgress } from "@d3lab/models/cosm";
import { diffAns } from "@d3lab/models/diff";

const cosminit = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    const isBuild = req.body.needBuild;

    if (!isBuild) {
        let [_, status] = await getAssetLoc(req, lesson);
        if (status === "done") {
            throw new APIError(
                400,
                `You already finished chapter ${chapter} - lesson ${lesson}`
            );
        }
        if (chapter === 1 && status === undefined) {
            await setAssetLoc(req, "start");
        } else if (chapter !== 1 && status === "start") {
            await setAssetLoc(req, "doing");
        }
        res.sendStatus(200);
    } else {
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
    }
});

const readDone = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    await cosm.finishChapter(req, lesson, chapter);
    let prog = await getProgress(req, lesson);
    res.json(prog);
});

const cosmDiff = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    const subchapter = Number(req.body.subchapter);

    if (req.body.isLast === true) {
        await cosm.finishChapter(req, lesson, chapter);
    }
    const ans = diffAns[lesson][chapter][subchapter];
    if (ans !== undefined) {
        res.json(ans);
    } else {
        throw new APIError(400, "Your subchapter is wrong");
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
    if (isSuccess === true) {
        await cosm.finishChapter(req, lesson, chapter);
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
    let [assetSuffix, _] = await getAssetLoc(req);
    if (assetSuffix instanceof Error) {
        throw assetSuffix;
    } else if (assetSuffix !== undefined) {
        const assetPath = path.join(process.cwd(), assetSuffix);
        res.sendFile(assetPath);
    }
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
