import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Arrowleft from "../../assets/images/arrow-left.svg";
import Arrowright from "../../assets/images/arrow-right.svg";

import HandleSideMenu from "./Components/HandleSideMenu";

const Container = tw.div`z-auto fixed transition ease-out duration-100 hover:opacity-100 focus:opacity-100 bottom-0 w-full z-50 border-3 border-indigo-900 bg-gray-50`;

function SmallNavigator() {
  const { lessonID, chID, uID, sID } = useParams();
  const navigate = useNavigate();
  const nextSmall = Number(sID) + 1;
  const prevSmall = Number(sID) - 1;

  const handleRight = () => {
    console.log("handle Right");
    if (lessonID === "1" && chID === "4" && uID === "1" && sID === "0") {
      return navigate(`/lesson/1/chapter/4/unit/1/small/1`);
    } else if (lessonID === "1" && chID === "4" && uID === "1" && sID === "8") {
      return navigate(`/lesson/1/chapter/4/unit/2/small/1`);
    } else if (
      lessonID === "1" &&
      chID === "4" &&
      uID === "2" &&
      sID === "11"
    ) {
      return navigate(`/lesson/1/chapter/4/unit/3/small/1`);
    } else if (lessonID === "1" && chID === "4" && uID === "3" && sID === "1") {
      return navigate(`/lesson/1/chapter/5/unit/1/small/0`);
    } else if (lessonID === "1" && chID === "5" && uID === "1" && sID === "3") {
      return navigate(`/lesson/1/chapter/5/unit/2/small/1`);
    } else if (lessonID === "1" && chID === "5" && uID === "2" && sID === "1") {
      return navigate(`/lesson/1/chapter/5/unit/2/small/2`);
    } else if (lessonID === "2" && chID === "6" && uID === "1" && sID === "5") {
      return navigate(`/lesson/2/chapter/6/unit/2/small/1`);
    } else if (lessonID === "2" && chID === "6" && uID === "2" && sID === "5") {
      return navigate(`/lesson/2/chapter/6/unit/3/small/1`);
    } else if (lessonID === "2" && chID === "6" && uID === "3" && sID === "5") {
      return navigate(`/lesson/2/chapter/6/unit/4/small/1`);
    } else if (lessonID === "2" && chID === "6" && uID === "4" && sID === "2") {
      return navigate(`/lesson/2/chapter/6/unit/5/small/1`);
    } else if (lessonID === "2" && chID === "6" && uID === "5" && sID === "2") {
      return navigate(`/lesson/2/chapter/7/unit/1/small/1`);
    } else if (lessonID === "2" && chID === "7" && uID === "1" && sID === "1") {
      return navigate(`/lesson/2/chapter/7/unit/2/small/1`);
    } else if (lessonID === "2" && chID === "7" && uID === "2" && sID === "1") {
      return navigate(`/lesson/2/chapter/7/unit/2/small/2`);
    } else if (lessonID === "3" && chID === "1" && uID === "2" && sID === "9") {
      return navigate(`/lesson/3/chapter/1/unit/3/small/1`);
    } else if (lessonID === "3" && chID === "1" && uID === "3" && sID === "1") {
      return navigate(`/lesson/3/chapter/2/unit/1/small/1`);
    } else if (lessonID === "3" && chID === "2" && uID === "1" && sID === "1") {
      return navigate(`/lesson/3/chapter/2/unit/2/small/1`);
    } else if (lessonID === "4" && chID === "2" && uID === "1" && sID === "3") {
      return navigate(`/lesson/4/chapter/3/unit/1`);
    } else {
      navigate(
        `/lesson/${lessonID}/chapter/${chID}/unit/${uID}/small/${nextSmall}`
      );
    }
  };

  const handleLeft = () => {
    console.log("handle Left");

    navigate(
      `/lesson/${lessonID}/chapter/${chID}/unit/${uID}/small/${prevSmall}`
    );
    if (sID === "1") {
      return navigate(
        `/lesson/${lessonID}/chapter/${chID}/unit/${uID}/small/${sID}`
      );
    } else if (uID === "1" && sID === "0") {
      return navigate(
        `/lesson/${lessonID}/chapter/${chID}/unit/${uID}/small/${sID}`
      );
    }
  };

  const lessonTitle = () => {
    if (lessonID === "0") {
      return "Get Ready for Terraforming";
    } else if (lessonID === "1") {
      return "Welcome to Spaceship Factory";
    } else if (lessonID === "2") {
      return "Fuel Up and Load the Freight";
    } else if (lessonID === "3") {
      return "Prepare to Launch";
    } else if (lessonID === "4") {
      return "ESFERA Takeoff";
    } else if (lessonID === "5") {
      return "Let's Play a Game!";
    }
  };

  window.addEventListener("scroll", e => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("bottom");
      const navigator = document.querySelectorAll("#navigator");
      navigator[0].classList.add("opacity-100");
      navigator[0].classList.remove("opacity-0");
    } else {
      const navigator = document.querySelectorAll("#navigator");
      navigator[0].classList.add("opacity-0");
      navigator[0].classList.remove("opacity-100");
    }
  });

  return (
    <Container id="navigator">
      <div class="container flex mx-auto lg:pb-4 lg:pt-3 py-2 items-center">
        <div class="lg:w-1/2 w-2/3 items-center md:px-2 px-4 mb-0">
          <div class="w-full flex flex-wrap items-center">
            <HandleSideMenu />
            <h2 class="text-xl md:text-2xl lg:text-3xl self-end md:mr-4 mr-2 text-indigo-900 font-heading">
              Lesson {lessonID}
            </h2>
            <h3 class="text-sm md:text-lg lg:text-xl self-end text-orange-400 font-heading">
              {lessonTitle()}
            </h3>
          </div>
        </div>
        <div class="lg:w-1/2 w-1/3 md:px-4 px-2">
          <div class="w-full flex flex-wrap items-center justify-end ">
            <button onClick={handleLeft}>
              <div class="bg-green-500 inline-block lg:h-10 h-9 md:w-16 w-10 md:mr-6 mr-2 border-3 border-indigo-900 lg:shadow shadow-sm rounded ease-in-out duration-300 transform hover:scale-110 hover:translate-x-2">
                <img
                  class="lg:h-6 lg:w-5 w-3 h-3 mx-auto mt-1"
                  src={Arrowleft}
                  alt=""
                />
              </div>
            </button>
            <button onClick={handleRight}>
              <div class="bg-blue-500 inline-block lg:h-10 h-9 md:w-16 w-10 md:mr-6 mr-2 border-3 border-indigo-900 lg:shadow shadow-sm rounded ease-in-out duration-300 transform hover:scale-110 hover:translate-x-2">
                <img
                  class="lg:h-6 lg:w-5 w-3 h-3 mx-auto mt-1"
                  src={Arrowright}
                  alt=""
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SmallNavigator;
