import React from "react";
import AboutCode from "../../../Contents/AboutCode";
import BasicP from "../../../Contents/BasicP";
import ListStyle from "../../../Contents/ListStyle";

function L1C4AboutCode() {
  return (
    <div class="block mx-4">
      <AboutCode>About Code</AboutCode>
      <BasicP>
        The CW721 Basic implements the following features covered by the CW721
        Spec:
      </BasicP>
      <ListStyle>
        <li>CW721 Base</li>
        <li>Metadata extension</li>
        <li>Enumerable extension</li>
      </ListStyle>
    </div>
  );
}

export default L1C4AboutCode;
