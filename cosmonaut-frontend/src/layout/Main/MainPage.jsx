import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useGetUserProgress } from "../../core/api/getUserProgress";
import { progressState } from "../../core/state/progressState";
import About from "./components/About";
import Intro from "./components/Intro";
import Learn from "./components/Learn";
import Made from "./components/Made";
import Special from "./components/Special";

function MainPage() {
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
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useRecoilState(progressState);

  useEffect(() => {
    zeroProgress();
    firProgress();
    secProgress();
    thrProgress();
    fourProgress();
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

  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Learn />
      <Special />
      <Made />
      <Footer />
    </>
  );
}

export default MainPage;
