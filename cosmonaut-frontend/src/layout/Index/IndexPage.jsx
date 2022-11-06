import React from "react";
import clsx from "clsx";
import tw from "tailwind-styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Overview from "./components/Overview";
import { useGetUserProgress } from "../../core/api/getUserProgress";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import Video from "../../assets/indexbg.mp4";
import { handleModalAtom } from "../../core/state/handleModal";
import { indexInfo } from "../../core/config/indexInfo";

const Curriculum = tw.div`w-full mb-14 lg:mb-0 lg:col-span-1 col-span-2 lg:order-2 order-1`;
const Title = tw.h2`text-2xl md:text-4xl text-center lg:text-left mt-2 text-orange-400 lg:mb-8 mb-6 font-heading`;
const LessonList = tw.div`md:space-y-5 space-y-3 md:mx-0 mx-6`;
const ButtonWrap = tw.div`flex flex-wrap mt-10 lg:justify-end justify-center group`;

function IndexPage() {
  const { lessonID } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [userLoading, userRes, userFetch] = useGetUserProgress(
    Number(lessonID)
  );
  // eslint-disable-next-line no-unused-vars
  const [handleModal, setHandleModal] = useRecoilState(handleModalAtom);

  useEffect(() => {
    userFetch();
    setHandleModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  const progressRouter = () => {
    switch (lessonID) {
      case "0":
        switch (userRes) {
          default:
            return navigate(`/lesson/0/chapter/1/unit/0`);
        }
      case "1":
        switch (userRes) {
          case -1:
            return navigate(`/lesson/1`);
          case 0:
            return navigate(`/lesson/1/chapter/1/unit/0`);
          case 1:
          case 4:
          case 5:
            return navigate(`/lesson/1/chapter/${userRes}/unit/0`);
          case 2:
          case 3:
          case 6:
            return navigate(`/lesson/1/chapter/${userRes}/unit/1`);
          default:
            return navigate(`/lesson/1`);
        }
      case "2":
        switch (userRes) {
          case -1:
            return navigate(`/lesson/2`);
          case 0:
            return navigate(`/lesson/2/chapter/1/unit/0`);
          case 1:
          case 6:
            return navigate(`/lesson/2/chapter/${userRes}/unit/0`);
          case 2:
          case 3:
          case 4:
          case 5:
          case 7:
          case 8:
            return navigate(`/lesson/2/chapter/${userRes}/unit/1`);
          default:
        }
        break;
      case "3":
        switch (userRes) {
          case -1:
            return navigate(`/lesson/3`);
          case 0:
            return navigate(`/lesson/3/chapter/1/unit/0`);
          case 1:
            return navigate(`/lesson/3/chapter/${userRes}/unit/0`);
          case 2:
          case 3:
            return navigate(`/lesson/3/chapter/${userRes}/unit/1`);
          default:
        }
        break;
      case "4":
        switch (userRes) {
          case -1:
            return navigate(`/lesson/4`);
          case 0:
            return navigate(`/lesson/4/chapter/1/unit/0`);
          case 1:
            return navigate(`/lesson/4/chapter/${userRes}/unit/0`);
          case 2:
          case 3:
            return navigate(`/lesson/4/chapter/${userRes}/unit/1`);
          default:
        }
        break;
      default:
    }
  };

  return (
    <>
      <Navbar />
      <div className="z-0 h-auto relative lg:pb-20 bg-cover bg-center bg-opacity-10 lg:pt-32">
        <div className="z-[-1] h-auto absolute top-[2.2rem] w-full">
          <video className="w-full" autoPlay muted loop playsInline>
            <source src={Video} type="video/mp4" />
          </video>
        </div>

        <div class="container lg:px-8 mx-auto relative mb-24">
          <div class="grid grid-cols-2 w-full mx-auto lg:gap-12 lg:-mx-4">
            <Overview />
            <Curriculum>
              <div class="max-w-lg px-4 mx-auto">
                <Title>Curriculum</Title>
                {indexInfo.map((e) => {
                  let lessonUrl;
                  if (e?.id === 5) {
                    lessonUrl = `/appendix/1`;
                  } else {
                    lessonUrl = `/lesson/${e?.id}`;
                  }
                  return (
                    <LessonList>
                      <Link key={e?.id} to={lessonUrl}>
                        <button
                          className={clsx(
                            "animate-fadeInRtoL mb-5 flex w-full md:px-6 px-3 md:py-3 py-1 bg-white md:shadow shadow-sm border-2 border-indigo-900 items-center justify-between ease-in-out duration-300 transform hover:scale-105 hover:bg-yellow-100 focus:bg-yellow-500 focus:outline-none focus:ring focus:ring-green-500 active:bg-yellow-500 rounded-md"
                          )}
                        >
                          <span class="md:text-lg text-sm font-heading text-indigo-900">
                            {e?.num}.
                          </span>
                          <span class="md:text-base text-xs font-heading text-indigo-900">
                            {e?.title}
                          </span>
                        </button>
                      </Link>
                    </LessonList>
                  );
                })}
                {userRes !== -1 || lessonID === "0" || lessonID === "5" ? (
                  <>
                    <ButtonWrap>
                      <button
                        onClick={progressRouter}
                        class="mt-[16px] hover:from-green-500 hover:to-blue-500 hover:text-white inline-block md:w-auto mb-2 md:mb-0 text-center leading-6 text-lg text-gray-900 font-heading bg-gradient-to-r from-yellow-500 to-orange-400 border-3 border-indigo-900 shadow rounded-full md:mx-0 mx-8 md:px-10 md:py-4 py-2 px-12"
                      >
                        START LESSON
                      </button>
                    </ButtonWrap>
                  </>
                ) : (
                  <>
                    <ButtonWrap>
                      <span className="w-full lg:text-right text-center text-white text-xs group-hover:opacity-100 opacity-0 font-bold md:mx-4 mx-8">
                        You have to finish previous lessons
                      </span>
                      <button
                        onClick={progressRouter}
                        class="inline-block md:w-auto mb-2 md:mb-0 text-center leading-6 text-lg text-gray-900 font-heading bg-gradient-to-r from-yellow-500 to-orange-400 border-3 border-indigo-900 shadow rounded-full md:mx-0 mx-8 md:px-10 md:py-4 py-2 px-12 opacity-40 cursor-not-allowed"
                      >
                        START LESSON
                      </button>
                    </ButtonWrap>
                  </>
                )}
              </div>
            </Curriculum>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default IndexPage;
