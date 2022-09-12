import express from "express";
import { cosm } from "@d3lab/controllers";
import { validateCosmCond } from "@d3lab/middlewares/cosm";

const router = express.Router();

router.route("/init").post(validateCosmCond, cosm.cosminit);

router.route("/read").post(validateCosmCond, cosm.readDone);

router.route("/diff").post(validateCosmCond, cosm.cosmDiff);

router.route("/build").post(validateCosmCond, cosm.cosmBuild);

router.route("/code").get(cosm.cosmLoadCodes);

router.route("/existence").get(cosm.chkProjExist);

router.route("/picture").get(cosm.getLessonPicture);

router.route("/progress").get(cosm.userProgress);

export default router;
