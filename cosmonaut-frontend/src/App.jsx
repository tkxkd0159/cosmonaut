import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";

import ScrollToTop from "./components/Common/ScrollToTop";
import Profile from "./components/Profile/Profile";

import SignUp from "./components/SignUp/SignUp";
import { LoginState } from "./core/state/login";
import NotFound from "./error/NotFound";
import AdvancePage from "./layout/Advanced/AdvancePage";
import { AppendixPage } from "./layout/Appendix/AppendixPage";
import { EpiloguePage } from "./layout/Epilogue/EpiloguePage";
import IndexInitialPage from "./layout/Index/IndexInitialPage";
import IndexPage from "./layout/Index/IndexPage";
import MainPage from "./layout/Main/MainPage";
import ProblemPage from "./layout/Problem/ProblemPage";
import UnitPage from "./layout/Unit/UnitPage";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/index"
            element={
              isLoggedIn ? (
                <IndexInitialPage />
              ) : (
                <Navigate to="/signUp" replace />
              )
            }
          />
          <Route
            path="/lesson/:lessonID"
            element={
              isLoggedIn ? <IndexPage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route
            path="/lesson/:lessonID/chapter/:chID/unit/:uID"
            element={
              isLoggedIn ? <UnitPage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route
            path="/lesson/:lessonID/chapter/:chID/unit/:uID/pb/:pID"
            element={
              isLoggedIn ? <ProblemPage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route
            path="/epilogue"
            element={
              isLoggedIn ? <EpiloguePage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route
            path="/appendix/:aID"
            element={
              isLoggedIn ? <AppendixPage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route
            path="/advanced/:adID/index/:iID"
            element={
              isLoggedIn ? <AdvancePage /> : <Navigate to="/signUp" replace />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
