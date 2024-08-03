import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionWindow from "./QuestionWindow";
import { logout } from "../redux/feauters/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questionShow, setQuestionShow] = useState<boolean>(false);
  const logOutHandler = () => {
    setQuestionShow(!questionShow);
    localStorage.removeItem("userInfo");
    dispatch(logout());
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
