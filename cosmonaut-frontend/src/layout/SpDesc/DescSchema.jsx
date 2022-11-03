import React from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import BackToOverview from "../components/BackToOverview";
import ChapterTitle from "../components/ChapterTitle";
import DescContents from "./DescContents";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import BgV4 from "../../assets/images/bg-v4.svg";
import Navigator from "../components/Navigator/Navigator";
import FinishModal from "../../components/FinishModal/FinishModal";
import { unitInfo } from "../../core/config/unitInfo";
import { chapterInfo } from "../../core/config/chapterInfo";

const Background = tw.div`pt-24 pb-8 px-6 lg:px-10 bg-black bg-cover bg-center`;

function DescSchema() {
  const { lessonID, chID, uID } = useParams();
  const unitData = unitInfo[lessonID];

  return (
    <>
      <Navbar />
      <Background style={{ backgroundImage: `url(${BgV4})` }}>
        <BackToOverview />
        <ChapterTitle
          chInfo={chapterInfo[lessonID]}
          unitInfo={unitData[chID - 1]}
        />
        <DescContents unitInfo={unitData[chID - 1]} />
      </Background>
      <Footer />
      {lessonID === "0" && chID === "4" && uID === "3" ? <FinishModal /> : null}
      <Navigator />
    </>
  );
}

export default DescSchema;
