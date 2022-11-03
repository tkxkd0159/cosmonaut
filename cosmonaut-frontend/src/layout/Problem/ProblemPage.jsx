import React from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ShortBg from "../../assets/images/short_bg.png";
import { PbContents } from "./components/PbContents";
import BackToOverview from "../components/BackToOverview";
import ChapterTitle from "../components/ChapterTitle";
import { unitInfo } from "../../core/config/unitInfo";
import { chapterInfo } from "../../core/config/chapterInfo";

const Background = tw.div`pt-24 pb-8 px-6 lg:px-10 bg-black bg-cover bg-center`;

const ProblemPage = () => {
  const { lessonID, chID } = useParams();
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
        <ChapterTitle
          chInfo={chapterInfo[lessonID]}
          unitInfo={unitData[chID - 1]}
        />
      </Background>
      <PbContents />
      <Footer />
    </>
  );
};

export default ProblemPage;
