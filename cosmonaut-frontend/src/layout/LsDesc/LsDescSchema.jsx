import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import BackToOverview from "../components/BackToOverview";
import ChapterTitle from "../components/ChapterTitle";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LsDesc from "./LSDesc";
import StartModal from "../../components/StartModal/StartModal";
import L1C4PlusDesc from "../../components/Chapter/lesson1/chapter4/L1C4PlusDesc";
import Navigator from "../components/Navigator/Navigator";
import BgV4 from "../../assets/images/bg-v4.svg";
import { handleModalAtom } from "../../core/state/handleModalState";
import { unitInfo } from "../../core/config/unitInfo";
import { chapterInfo } from "../../core/config/chapterInfo";

const Background = tw.div`pt-24 pb-8 px-6 lg:px-10 bg-black bg-cover bg-center`;

function LsDescSchema() {
  const { lessonID, chID, uID } = useParams();
  const unitData = unitInfo[lessonID];
  const handleModal = useRecoilValue(handleModalAtom);

  return (
    <>
      <Navbar />
      {handleModal ? <StartModal /> : null}
      <Background style={{ backgroundImage: `url(${BgV4})` }}>
        <BackToOverview />
        <ChapterTitle
          chInfo={chapterInfo[lessonID]}
          unitInfo={unitData[chID - 1]}
        />
        <LsDesc />
        {lessonID === "1" && chID === "4" && uID === "0" ? (
          <L1C4PlusDesc />
        ) : null}
      </Background>
      <Footer />
      <Navigator />
    </>
  );
}

export default LsDescSchema;
