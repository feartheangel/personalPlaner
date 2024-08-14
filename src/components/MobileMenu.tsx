import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionWindow from "./QuestionWindow";
import { logout } from "../redux/feauters/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeTasks } from "../redux/feauters/taskAllDays/taskAllDays";
import { clearTask } from "../redux/feauters/taskToday/taskToday";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questionShow, setQuestionShow] = useState<boolean>(false);
  const logOutHandler = () => {
    setQuestionShow(!questionShow);
    dispatch(logout());
    dispatch(removeTasks());
    dispatch(clearTask());
    toast.success("Выход из профиля!");
    navigate("/register");
  };
  const openWarning = () => {
    setQuestionShow(true);
  };

  return (
    <>
      <div className="w-full h-dvh flex flex-col justify-center items-center">
        <ul className="flex flex-col items-center gap-8 text-xl font-bold text-white">
          <li>
            <Link to={"/"}>Планы на сегодня</Link>
          </li>

          <li>
            <Link to={"/totalStatistics"}>Общая статистика</Link>
          </li>

          <li>
            <Link to={"/achievements"}>Достижения</Link>
          </li>

          <li onClick={openWarning}>Выйти</li>
        </ul>
      </div>
      {questionShow && (
        <QuestionWindow
          show={questionShow}
          setQuestionShow={setQuestionShow}
          logOutHandler={logOutHandler}
        />
      )}
    </>
  );
};

export default MobileMenu;
