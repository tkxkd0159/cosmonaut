import React from "react";
import { Link, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Video from "../../assets/indexbg.mp4";
import { indexInfo } from "../../core/config/indexInfo";
import { ReadyJourney } from "./components/ReadyJourney";
// import spacehole from "../../assets/images/spacehole-2x.jpg";

const Title = tw.h2`text-2xl md:text-4xl text-center lg:text-left mt-2 text-orange-400 lg:mb-8 mb-6 font-heading`;
const LessonList = tw.div`md:space-y-5 space-y-3 md:mx-0 mx-6`;
const ButtonWrap = tw.div`flex flex-wrap mt-10 lg:justify-end justify-center group`;
const Curriculum = tw.div`w-full mb-14 lg:mb-0 lg:col-span-1 col-span-2 lg:order-2 order-1`;

function IndexInitialPage() {
  const { lessonID } = useParams();
  let startLesson;
  if (lessonID === undefined) {
    startLesson = "/index";
  } else {
    startLesson = `/${lessonID}/chapter/1/unit/0`;
  }

  return (
    <>
      <Navbar />
      <div className="z-0 h-auto relative lg:pb-20 bg-cover bg-center bg-opacity-10 lg:pt-32">
        <div className="z-[-3] absolute top-[2.2rem] w-full h-[1100px]">
          <video
            className="z-[-2] absolute top-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={Video} type="video/mp4" />
          </video>
          <video
            className="z-[-2] absolute bottom-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <div class="container lg:px-8 mx-auto relative mb-24">
          <div class="grid grid-cols-2 w-full mx-auto lg:gap-12 lg:-mx-4">
            <ReadyJourney />
            <Curriculum>
              <div class="max-w-lg px-4 mx-auto">
                <Title>Curriculum</Title>
                <LessonList>
                  {indexInfo?.map((e) => {
                    let lessonUrl;
                    if (e?.id === 5) {
                      lessonUrl = `/appendix/1`;
                    } else {
                      lessonUrl = `/lesson/${e?.id}`;
                    }
                    return (
                      <Link key={e?.id} to={lessonUrl}>
                        <button class="animate-fadeInRtoL mb-5 flex w-full md:px-6 px-3 md:py-3 py-1 bg-white md:shadow shadow-sm border-2 border-indigo-900 items-center justify-between ease-in-out duration-300 transform hover:scale-105 hover:bg-yellow-100 focus:bg-yellow-500 focus:outline-none focus:ring focus:ring-green-500 active:bg-yellow-500 rounded-md">
                          <span class="md:text-lg text-sm font-heading text-indigo-900">
                            {e?.num}.
                          </span>
                          <span class="md:text-base text-xs font-heading text-indigo-900">
                            {e?.title}
                          </span>
                        </button>
                      </Link>
                    );
                  })}
                </LessonList>
                <ButtonWrap>
                  <span className="w-full lg:text-right text-center text-white text-xs group-hover:opacity-100 opacity-0 font-bold md:mx-4 mx-8">
                    You have to choose a lesson to start
                  </span>
                  <Link to={startLesson}>
                    <button class="inline-block md:w-auto mb-2 md:mb-0 text-center leading-6 text-lg text-gray-900 font-heading bg-gradient-to-r from-yellow-500 to-orange-400 border-3 border-indigo-900 shadow rounded-full md:mx-0 mx-8 md:px-10 md:py-4 py-2 px-12 opacity-40 cursor-not-allowed">
                      START LESSON
                    </button>
                  </Link>
                </ButtonWrap>
              </div>
            </Curriculum>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexInitialPage;
