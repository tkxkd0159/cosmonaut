import path from "path";
import { writeFile, readFile, readdir } from "fs/promises";
import { createHash } from "crypto";
import { NextFunction } from "express";
import { Base64, RustFiles, expressAsyncHandler } from "@d3lab/types";

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const b64ToStr = (raw: Base64): string => {
    return Buffer.from(raw, "base64").toString("utf-8");
};

async function _saveCode(path: string, code: Base64) {
    const stringCode = b64ToStr(code).trim();
    if (stringCode.match(/\b(?!cosmwasm_\b)std::\b(?!convert\b)\b(?!ops\b)/g)) {
        throw new Error("This code is not valid.");
    }
    await writeFile(path, stringCode);
}

async function saveCodeFiles(files: RustFiles, projPath: string) {
    for (let [filename, code] of Object.entries(files)) {
        const fpath = path.join(projPath, filename);
        await _saveCode(fpath, code);
    }
}

async function lodeCodeFiles(projPath: string): Promise<RustFiles | undefined> {
    try {
        const filelist = await readdir(projPath);
        const result: RustFiles = {};
        for (let fname of filelist) {
            if (fname.slice(-3) !== ".rs") {
                continue;
            }
            let fpath = path.join(projPath, fname);
            let code = await readFile(fpath);
            result[fname] = code.toString("base64");
        }
        return result;
    } catch (err) {
        console.error(err);
    }
}

function makeLessonPicturePath(lesson: number): string {
    const dirPrefix =
        createHash("sha256").update(`cosmonaut-lesson${lesson}`).digest("hex") +
        `-${lesson}`;
    const dirPath = path.join("assets", dirPrefix);
    return dirPath;
}

function srcStrip(origin: string): string {
    const target = "/src";
    let cursor = 0;
    let isStart = true;

    while (true) {
        let tmpCursor = origin.indexOf(
            target,
            isStart ? cursor : cursor + target.length
        );
        isStart = false;
        if (tmpCursor === -1) {
            break;
        } else {
            cursor = tmpCursor;
        }
    }

    if (cursor <= 0) {
        return origin;
    } else {
        return origin.slice(0, cursor);
    }
}

const asyncUtil: expressAsyncHandler = (fn) =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1] as NextFunction;
        return Promise.resolve(fnReturn).catch(next);
    };

export {
    sleep,
    b64ToStr,
    lodeCodeFiles,
    saveCodeFiles,
    srcStrip,
    makeLessonPicturePath,
    asyncUtil,
};
