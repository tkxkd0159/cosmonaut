import { existsSync } from "fs";
import { rust, cosm, getUid } from "@d3lab/services";
import { RustFiles } from "@d3lab/types";
import conf from "@d3lab/config";
import { saveCodeFiles, srcStrip, asyncUtil } from "@d3lab/utils";

const fmtCodes = asyncUtil(async (req, res, next) => {
    const beforeFmtFiles: RustFiles = req.body["files"];
    const afterFmtFiles: RustFiles = {};

    if (conf.isLocalRust === true) {
        for (let [key, value] of Object.entries(beforeFmtFiles)) {
            afterFmtFiles[key] = await rust.rustfmt(value, conf.isLocalRust);
        }
    } else {
        for (let [key, value] of Object.entries(beforeFmtFiles)) {
            afterFmtFiles[key] = await rust.rustfmt(value);
        }
    }

    res.send({
        result: afterFmtFiles,
    });
});

const clippy = asyncUtil(async (req, res, next) => {
    const uid = getUid(req);
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);
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
    await saveCodeFiles(req.body["files"], srcpath);

    const result = await cosm.Run("clippy", uid, lesson, chapter);
    res.json({ result });
});

export { fmtCodes, clippy };
