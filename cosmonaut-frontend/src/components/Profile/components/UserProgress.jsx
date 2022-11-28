import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import {
  ProgressBar0,
  ProgressBar1,
  ProgressBar2,
  ProgressBar3,
  ProgressBar4,
} from "../../Common/ProgressBar";
import error from "../../../assets/images/dummy-nft.jpg";
import { useRecoilState } from "recoil";
import { useGetLessonPic } from "../../../core/api/getLessonPic";
import { useGetUserProgress } from "../../../core/api/getUserProgress";
import { progressState } from "../../../core/state/progressState";
import { useNavigate } from "react-router-dom";

const Container = tw.div`flex flex-wrap -mb-12`;
const Profile = tw.div`w-full md:w-1/2 lg:w-1/3 mb-12`;

function UserProgress() {
  const [zeroRes, zeroFetch] = useGetLessonPic(0);
  const [firRes, firFetch] = useGetLessonPic(1);
  const [secRes, secFetch] = useGetLessonPic(2);
  const [thrRes, thrFetch] = useGetLessonPic(3);
  const [fourRes, fourFetch] = useGetLessonPic(4);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [zeroLoading, zeroPro, zeroProgress] = useGetUserProgress(0);
  // eslint-disable-next-line no-unused-vars
  const [firLoading, firPro, firProgress] = useGetUserProgress(1);
  // eslint-disable-next-line no-unused-vars
  const [secLoading, secPro, secProgress] = useGetUserProgress(2);
  // eslint-disable-next-line no-unused-vars
  const [thrLoading, thrPro, thrProgress] = useGetUserProgress(3);
  // eslint-disable-next-line no-unused-vars
  const [fourLoading, fourPro, fourProgress] = useGetUserProgress(4);

  const [zero, setZero] = useState("0%");
  const [fir, setFir] = useState("0%");
  const [sec, setSec] = useState("0%");
  const [thr, setThr] = useState("0%");
  const [four, setFour] = useState("0%");
  const [progress, setProgress] = useRecoilState(progressState);

  useEffect(() => {
    zeroProgress();
    firProgress();
    secProgress();
    thrProgress();
    fourProgress();

    if (
      !(progress[0] === "-1") &&
      !(progress[0] === "1") &&
      !(progress[0] === "")
    )
      zeroFetch();
    if (!(progress[1] === "-1") && !(progress[1] === "")) firFetch();
    if (!(progress[2] === "-1") && !(progress[2] === "")) secFetch();
    if (!(progress[3] === "-1") && !(progress[3] === "")) thrFetch();
    if (!(progress[4] === "-1") && !(progress[4] === "")) fourFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProgress({
      0: String(zeroPro),
      1: String(firPro),
      2: String(secPro),
      3: String(thrPro),
      4: String(fourPro),
    });
  }, [zeroPro, firPro, secPro, thrPro, fourPro, setProgress]);

  useEffect(() => {
    switch (zeroPro) {
      case 0:
        setZero("Completed");
        break;
      case -1:
        setZero("0%");
        break;
      default:
        setZero("0%");
    }
    switch (firPro) {
      case 0:
        setFir("Completed");
        break;
      case -1:
        setFir("0%");
        break;
      default:
        setFir("Progress");
    }
    switch (secPro) {
      case 0:
        setSec("Completed");
        break;
      case -1:
        setSec("0%");
        break;
      default:
        setSec("Progress");
    }
    switch (thrPro) {
      case 0:
        setThr("Completed");
        break;
      case -1:
        setThr("0%");
        break;
      default:
        setThr("Progress");
    }
    switch (fourPro) {
      case 0:
        setFour("Completed");
        break;
      case -1:
        setFour("0%");
        break;
      default:
        setFour("Progress");
    }
  }, [zeroPro, firPro, secPro, thrPro, fourPro]);

  const onErrorImg = (e) => {
    e.target.src = error;
  };

  const zeroProgressRouter = () => {
    switch (zeroPro) {
      case -1:
        return navigate(`/lesson/0`);
      case 0:
        return navigate(`/profile`);
      default:
        return navigate(`/lesson/0/chapter/${zeroPro}/unit/0`);
    }
  };
  const firProgressRouter = () => {
    switch (firPro) {
      case -1:
        return navigate(`/lesson/1`);
      case 0:
        return navigate(`/profile`);
      case 1:
      case 4:
      case 5:
        return navigate(`/lesson/1/chapter/${firPro}/unit/0`);
      case 2:
      case 3:
      case 6:
        return navigate(`/lesson/1/chapter/${firPro}/unit/1`);
      default:
        return navigate(`/profile`);
    }
  };
  const secProgressRouter = () => {
    switch (secPro) {
      case -1:
        return navigate(`/lesson/2`);
      case 0:
        return navigate(`/profile`);
      case 1:
      case 6:
        return navigate(`/lesson/2/chapter/${secPro}/unit/0`);
      case 2:
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
        return navigate(`/lesson/2/chapter/${secPro}/unit/1`);
      default:
        return navigate(`/profile`);
    }
  };
  const thrProgressRouter = () => {
    switch (thrPro) {
      case -1:
        return navigate(`/lesson/3`);
      case 0:
        return navigate(`/profile`);
      case 1:
        return navigate(`/lesson/3/chapter/${thrPro}/unit/0`);
      case 2:
      case 3:
        return navigate(`/lesson/3/chapter/${thrPro}/unit/1`);
      default:
        return navigate(`/profile`);
    }
  };
  const fourProgressRouter = () => {
    switch (fourPro) {
      case -1:
        return navigate(`/lesson/4`);
      case 0:
        return navigate(`/profile`);
      case 1:
        return navigate(`/lesson/4/chapter/${fourPro}/unit/0`);
      case 2:
      case 3:
        return navigate(`/lesson/4/chapter/${fourPro}/unit/1`);
      default:
        return navigate(`/profile`);
    }
  };

  return (
    <Container>
      <Profile>
        <div class="mx-2 lg:p-2 shadow rounded-2xl bg-yellow-500 p-2">
          <div class="h-full p-4 md:p-8 bg-white border-4 border-indigo-900  rounded-xl text-center">
            <img
              class="block mx-auto mb-4"
              src={zeroRes}
              onError={onErrorImg}
              alt=""
            />
            <h4 class="text-2xl text-indigo-900 font-heading mb-1">Prologue</h4>
            <h3 class="text-lg text-indigo-900 font-heading mb-4">
              Get Ready for Terraforming
            </h3>
            <ProgressBar0 progress={zeroPro} />
            <div
              onClick={zeroProgressRouter}
              class="cursor-pointer block mx-auto px-4 py-0.5 rounded-full border-2 bg-gray-50 border-gray-500 text-gray-500 text-lg font-heading"
            >
              {zero}
            </div>
          </div>
        </div>
      </Profile>
      <Profile>
        <div class="mx-2 lg:p-2 shadow rounded-2xl bg-orange-500 p-2">
          <div class="h-full p-4 md:p-8 bg-white border-4 border-indigo-900  rounded-xl text-center">
            <img
              class="block mx-auto mb-4"
              src={firRes}
              onError={onErrorImg}
              alt=""
            />
            <h4 class="text-2xl text-indigo-900 font-heading mb-1">
              Lesson 1.
            </h4>
            <h3 class="text-lg text-indigo-900 font-heading mb-4">
              Welcome to Spaceship Factory
            </h3>
            <ProgressBar1 progress={firPro} />
            <div
              onClick={firProgressRouter}
              class="cursor-pointer block mx-auto px-4 py-0.5 rounded-full border-2 bg-gray-50 border-gray-500 text-gray-500 text-lg font-heading"
            >
              {fir}
            </div>
          </div>
        </div>
      </Profile>
      <Profile>
        <div class="mx-2 lg:p-2 shadow rounded-2xl bg-green-500 p-2">
          <div class="h-full p-4 md:p-8 bg-white border-4 border-indigo-900  rounded-xl text-center">
            <img
              class="block mx-auto mb-4"
              src={secRes}
              onError={onErrorImg}
              alt=""
            />
            <h4 class="text-2xl text-indigo-900 font-heading mb-1">
              Lesson 2.
            </h4>
            <h3 class="text-lg text-indigo-900 font-heading mb-4">
              Fuel Up and Load the Freight
            </h3>
            <ProgressBar2 progress={secPro} />
            <div
              onClick={secProgressRouter}
              class="cursor-pointer block mx-auto px-4 py-0.5 rounded-full border-2 bg-gray-50 border-gray-500 text-gray-500 text-lg font-heading"
            >
              {sec}
            </div>
          </div>
        </div>
      </Profile>
      <Profile>
        <div class="mx-2 lg:p-2 shadow rounded-2xl bg-blue-500 p-2">
          <div class="h-full p-4 md:p-8 bg-white border-4 border-indigo-900  rounded-xl text-center">
            <img
              class="block mx-auto mb-4"
              src={thrRes}
              onError={onErrorImg}
              alt=""
            />
            <h4 class="text-2xl text-indigo-900 font-heading mb-1">
              Lesson 3.
            </h4>
            <h3 class="text-lg text-indigo-900 font-heading mb-4">
              Prepare to Launch
            </h3>
            <ProgressBar3 progress={thrPro} />
            <div
              onClick={thrProgressRouter}
              class="cursor-pointer block mx-auto px-4 py-0.5 rounded-full border-2 bg-gray-50 border-gray-500 text-gray-500 text-lg font-heading"
            >
              {thr}
            </div>
          </div>
        </div>
      </Profile>
      <Profile>
        <div class="mx-2 lg:p-2 shadow rounded-2xl bg-yellow-500 p-2">
          <div class="h-full p-4 md:p-8 bg-white border-4 border-indigo-900  rounded-xl text-center">
            <img
              class="block mx-auto mb-4"
              src={fourRes}
              onError={onErrorImg}
              alt=""
            />
            <h4 class="text-2xl text-indigo-900 font-heading mb-1">
              Lesson 4.
            </h4>
            <h3 class="text-lg text-indigo-900 font-heading mb-4">
              ESFERA Takeoff
            </h3>
            <ProgressBar4 progress={fourPro} />
            <div
              onClick={fourProgressRouter}
              class="cursor-pointer block mx-auto px-4 py-0.5 rounded-full border-2 bg-gray-50 border-gray-500 text-gray-500 text-lg font-heading"
            >
              {four}
            </div>
          </div>
        </div>
      </Profile>
    </Container>
  );
}

export default UserProgress;
