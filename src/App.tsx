import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import Main from "./pages/profile/main/Main";
import RegisterPage from "./pages/auth/register/Register";
import Statistics from "./pages/profile/static/Statistics";

import { logIn } from "./redux/feauters/auth/authSlice";
import { uploadStateRTK } from "./redux/feauters/taskAllDays/taskAllDays";
import { uploadTodayRTK } from "./redux/feauters/taskToday/taskToday";
import MobileMenu from "./components/MobileMenu";
import NotFound from "./components/NotFound";
import Achievements from "./pages/profile/achievements/Achievements";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = localStorage.getItem("userInfo");
  let uploadData = localStorage.getItem("allTask");
  const selectDate = useSelector((state: any) => state.taskToday.selectDate);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }

    if (user) {
      dispatch(logIn(JSON.parse(user)));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (uploadData) {
      let newData = JSON.parse(uploadData);
      dispatch(uploadStateRTK(newData));

      const today = newData.allTasks?.filter(
        (item: any) => item.date === selectDate,
      );

      if (today[0]) {
        dispatch(uploadTodayRTK(today[0]));
      }
    }
  }, [uploadData]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/register"
            element={user ? <NotFound /> : <RegisterPage />}
          />
          <Route path="/" element={<Main />} />
          <Route path="/totalStatistics" element={<Statistics />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/menu" element={<MobileMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
