import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { chapterInfos } from "../../core/config/chapterInfoAtoms";
import { unitInfos } from "../../core/config/unitInfoAtoms";
import ShortBg from "../../assets/images/short_bg.png";
import { PbContents } from "./components/PbContents";
import BackToOverview from "../components/BackToOverview";
import ChapterTitle from "../components/ChapterTitle";

const Background = tw.div`pt-24 pb-8 px-6 lg:px-10 bg-black bg-cover bg-center`;

const ProblemPage = () => {
  const { lessonID, chID } = useParams();
  const chInfo = useRecoilValue(chapterInfos);
  const unitInfo = useRecoilValue(unitInfos);
  const unitData = unitInfo[lessonID];
  return (
    <>
      <Navbar />

      <Background
        style={{
          backgroundImage: `url(${ShortBg})`,
        }}
      >
        <BackToOverview />
        <ChapterTitle chInfo={chInfo[lessonID]} unitInfo={unitData[chID - 1]} />
      </Background>
      <PbContents />
      <Footer />
    </>
  );
};

export default ProblemPage;
