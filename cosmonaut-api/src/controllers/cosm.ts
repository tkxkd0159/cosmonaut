import { existsSync } from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { cosm, getUid } from "@d3lab/services";
import { APIError, CosmAns } from "@d3lab/types";
import {
    sleep,
    saveCodeFiles,
    lodeCodeFiles,
    srcStrip,
    asyncUtil,
} from "@d3lab/utils";
import {
    getAssetLoc,
    setAssetLoc,
    getProgress,
    setProgress,
    getChapterThreshold,
} from "@d3lab/models/cosm";

const cosminit = async (req: Request, res: Response, next: NextFunction) => {
    let uid;
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
    try {
        uid = getUid(req);
        cosm.checkTarget(lesson, chapter);
        await cosm.checkLessonRange(lesson, chapter);
        await cosm.checkProjOrder(req, lesson, chapter);
    } catch (error) {
        return next(error);
    }

    try {
        const genfilePath = path.join(
            cosm.getCosmFilePath(
                req.app.locals.cargoPrefix,
                uid,
                lesson,
                chapter,
                true
            ),
            "main.rs"
        );

        const dirpath = process.env.COMPOSE
            ? srcStrip(genfilePath)
            : srcStrip(genfilePath).split("/cargo-projects/")[1];
        await cosm.Run("cosm-init", dirpath);
        await sleep(1000);
        if (existsSync(genfilePath)) {
            if (chapter === 1) {
                await setAssetLoc(req, "start");
            } else {
                await setAssetLoc(req, "doing");
            }
            res.json({ isGen: true });
        } else {
            res.json({ isGen: false });
        }
    } catch (err) {
        return next(
            new APIError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Occur unexpected error during make a cosm project"
            )
        );
    }
};

const cosmDiff = asyncUtil(async (req, res, next) => {
    let uid;
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    uid = getUid(req);
    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);

    res.locals.threshold = await getChapterThreshold(lesson);
    if (chapter === res.locals.threshold) {
        next();
    } else {
        if (true) {
            await setProgress(req, lesson, chapter + 1);
            res.json({ status: "success" });
        }
    }
});

const cosmBuild = async (req: Request, res: Response, next: NextFunction) => {
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

    const dirpath = srcStrip(srcpath);
    try {
        const data = await cosm.Run("cosm-build", dirpath);

        // const parsedData: CosmAns = JSON.parse(data)
        // if (parsedData.result === "success") {
        //     const threshold = await getChapterThreshold(lesson)
        //     if (chapter === threshold) {
        //         await setAssetLoc(req, "done");
        //         await setProgress(req, lesson, 0);
        //     } else {
        //         await setProgress(req, lesson, chapter + 1);
        //     }
        // }

        if (true) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            const result: CosmAns = {
                answer_type: "execute",
                result: "success",
                lesson: lesson,
                errors: [],
                differences: [data],
            };
            res.json(result);
        }
    } catch (err) {
        if (typeof err === "string") {
            return next(new APIError(httpStatus.BAD_REQUEST, err));
        }
    }
};

const cosmLoadCodes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let uid;
    const lesson = Number(req.query.lesson);
    const chapter = Number(req.query.chapter);
    try {
        uid = getUid(req);
        cosm.checkTarget(lesson, chapter);
        await cosm.checkLessonRange(lesson, chapter);
    } catch (error) {
        return next(error);
    }

    const srcpath = cosm.getCosmFilePath(
        req.app.locals.cargoPrefix,
        uid,
        lesson,
        chapter,
        true
    );
    if (!existsSync(srcpath)) {
        next(new Error("This chapter does not exist on you"));
    }

    const files = await lodeCodeFiles(srcpath);
    res.json(files);
};

const getLessonPicture = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.query.lesson);
    await cosm.checkLessonRange(lesson);
    let assetSuffix = await getAssetLoc(req);
    const assetPath = path.join(process.cwd(), assetSuffix);
    res.sendFile(assetPath);
});

const userProgress = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.query.lesson);
    await cosm.checkLessonRange(lesson);
    const p = await getProgress(req, lesson);
    res.json(p);
});

export {
    cosminit,
    cosmDiff,
    cosmBuild,
    cosmLoadCodes,
    getLessonPicture,
    userProgress,
};
