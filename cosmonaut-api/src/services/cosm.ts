import path from "path";
import { spawn } from "child_process";
import pidtree from "pidtree";
import { Request } from "express";
import httpStatus from "http-status";
import conf from "@d3lab/config";
import { APIError } from "@d3lab/types";
import { pg } from "@d3lab/db";
import {
    getProgress,
    setProgress,
    setAssetLoc,
    getChapterThreshold,
} from "@d3lab/models/cosm";

function getCosmFilePath(
    prefix: string,
    uid: string,
    lesson: number,
    chapter: number,
    withSrc: boolean
): string {
    const r: { [key: number]: any } = {
        1: {
            6: "cosmonaut-cw721",
        },
        2: {
            8: "cosmonaut-cw20",
        },
        3: {
            8: "cosmonaut-main",
        },
        4: {
            2: "cosmonaut-main",
        },
    };
    const l = lesson;
    const c = chapter;

    let cosmPath;
    if (withSrc) {
        cosmPath = path.join(
            process.cwd(),
            prefix,
            `${uid}/lesson${l}/chapter${c}/contracts/${r[l][c]}/src`
        );
    } else {
        cosmPath = path.join(
            process.cwd(),
            prefix,
            `${uid}/lesson${lesson}/chapter${chapter}`
        );
    }
    return cosmPath;
}

function checkTarget(lesson: number, chapter: number) {
    if (isNaN(lesson) || isNaN(chapter)) {
        throw new APIError(
            httpStatus.BAD_REQUEST,
            `you must fill lesson & chapter name correctly (got => lesson : ${lesson}, chapter : ${chapter}`
        );
    }
}

async function Run(
    cmd: string,
    userid: string,
    lesson: number,
    chapter: number
): Promise<string> {
    let subprocess = spawn("make", [
        cmd,
        `USER_ID=${userid}`,
        `LESSON=${lesson}`,
        `CHAPTER=${chapter}`,
    ]);
    let result = "";
    let error = "";
    let subTimeout: NodeJS.Timeout;

    if (cmd !== "cosm-init") {
        subTimeout = setTimeout(() => {
            result = "";
            error = "Your code execution time is over the maximum\n";

            pidtree(subprocess.pid as number, (err, pids) => {
                if (pids === undefined) {
                    return;
                } else {
                    for (let i = 0; i < pids.length; i++) {
                        if (i === 0) {
                            process.kill(pids[i], "SIGTERM");
                        } else {
                            process.kill(pids[i], "SIGKILL");
                        }
                    }
                }
            });
        }, conf.timeout.rust);

        subprocess.stdout.on("data", (data) => {
            if (data instanceof Buffer) {
                result += data.toString();
            }
        });

        subprocess.stderr.on("data", (data) => {
            if (data instanceof Buffer) {
                error += data.toString();
            }
        });
    }

    return new Promise((resolve, reject) => {
        subprocess.on("close", (exitCode) => {
            if (cmd !== "cosm-init") {
                clearTimeout(subTimeout);

                if (result !== "") {
                    resolve(result);
                } else {
                    reject(new Error(`${error.split("make")[0]}`));
                }
            } else {
                resolve("success");
            }
        });
    });
}

async function checkLessonRange(lesson: number, chapter?: number) {
    const chLimit = await getChapterThreshold(lesson);
    if (chapter !== undefined && chLimit !== undefined) {
        if (!(chLimit >= chapter && chapter > 0)) {
            throw new APIError(
                httpStatus.BAD_REQUEST,
                "This chapter does not exist."
            );
        }
    }
}

async function checkProjOrder(req: Request, lesson: number, chapter: number) {
    try {
        const currentUserProgress = await getProgress(req, lesson);
        const savedChapter = currentUserProgress["chapter"];
        if (savedChapter === 0) {
            return;
        } else if (savedChapter === -1) {
            throw new APIError(
                httpStatus.BAD_REQUEST,
                "You should initialize lesson before start"
            );
        } else if (chapter !== savedChapter) {
            throw new APIError(
                httpStatus.BAD_REQUEST,
                `You must set correct chapter => got: ${chapter}, expected: ${savedChapter}`
            );
        }

        if (chapter === 1) {
            if (lesson === 0) {
                return;
            } else {
                const prevUserProgress = await getProgress(req, lesson - 1);
                if (prevUserProgress["chapter"] !== 0) {
                    throw new APIError(
                        httpStatus.BAD_REQUEST,
                        "You should finish previous lesson before start new lesson"
                    );
                } else {
                    return;
                }
            }
        }
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        } else {
            console.error(error);
        }
    }
}

async function finishChapter(req: Request, lesson: number, chapter: number) {
    let prog = await getProgress(req, lesson);
    const chLimit = await getChapterThreshold(lesson);
    if (prog.chapter !== 0) {
        if (lesson <= prog.lesson && chapter < prog.chapter) {
            throw new APIError(
                httpStatus.BAD_REQUEST,
                `You already finished lesson ${lesson} - chapter ${chapter}`
            );
        }

        if (chapter === chLimit) {
            await setAssetLoc(req, "done");
            await setProgress(req, lesson, 0);
            await setProgress(req, lesson + 1, 1);
        } else {
            await setProgress(req, lesson, chapter + 1);
        }
    }
}

export {
    getCosmFilePath,
    checkTarget,
    Run,
    checkLessonRange,
    checkProjOrder,
    finishChapter,
};
