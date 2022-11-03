import React from "react";
import tw from "tailwind-styled-components";
import { useParams } from "react-router-dom";
import { unitInfo } from "../../core/config/unitInfo";

const Header = tw.div`bg-orange-500 py-2 lg:py-6 md:py-3`;

function UnitName(props) {
  const { lessonID, uID, chID } = useParams();
  const unitData = unitInfo[lessonID];

  return (
    <Header style={{ backgroundColor: `${props.color}` }}>
      <div class="container px-4 mx-auto">
        <div class="text-center">
          <h1 class="font-extrabold font-heading text-yellow-100 md:text-2xl text-lg">
            {chID}-{unitInfo[chID - 1][uID - 1]?.id}.{" "}
            {unitData[chID - 1][uID - 1]?.title}
          </h1>
        </div>
      </div>
    </Header>
  );
}

export default UnitName;
