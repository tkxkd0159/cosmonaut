import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../error/NotFound";
import LsDescSchema from "../LsDesc/LsDescSchema";
import DescSchema from "../SpDesc/DescSchema";
import EditorSchema from "../EdDesc/EditorSchema";

function UnitPage() {
  const { lessonID, chID, uID } = useParams();

  if (lessonID === "0") {
    return <DescSchema />;
  } else if (uID === "0") {
    return <LsDescSchema />;
  } else if (lessonID === "1" && (chID === "4" || "5") && uID === "0") {
    return <LsDescSchema />;
  } else if (lessonID === "1" || "2" || "3" || "4") {
    return <EditorSchema />;
  } else {
    return <NotFound />;
  }
}

export default UnitPage;
