import {asyncUtil} from "@d3lab/utils"
import {cosm} from "@d3lab/services"

const validateCosmCond = asyncUtil(async (req, res, next) => {
    const lesson = Number(req.body.lesson);
    const chapter = Number(req.body.chapter);

    cosm.checkTarget(lesson, chapter);
    await cosm.checkLessonRange(lesson, chapter);
    await cosm.checkProjOrder(req, lesson, chapter);

    next();
})

export {validateCosmCond}