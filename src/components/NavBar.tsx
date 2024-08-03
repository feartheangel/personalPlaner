import React, { useState } from "react";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuestionWindow from "./QuestionWindow";
import { logout } from "../redux/feauters/auth/authSlice";
import { toast } from "react-toastify";
import classNames from "classnames";

const NavBar = () => {
  const [questionShow, setQuestionShow] = useState<boolean>(false);
  const [opened, setOpened] = useState(false);
  const { id, name } = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRoute = useMatch("/menu");

  const openWarning = () => {
    setQuestionShow(true);
  };

  const logOutHandler = () => {
    setQuestionShow(!questionShow);
    localStorage.removeItem("userInfo");
    dispatch(logout());
    toast.success("Выход из профиля!");
    navigate("/register");
  };

  const activeStyles = {
    color: "white",
  };

  return (
    <>
      {id && !menuRoute && (
        <div className="flex py-4 px-4 justify-between items-center border-b-2 border-gray-400">
          <span className="flex justify-center items-center w-max px-3 h-max text-white rounded-sm bg-gray-600">
            Personal Planer
          </span>

          <ul className="hidden md:flex gap-8">
            <li>
              <NavLink
                to={"/"}
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                className="text-gray-400 hover:text-white"
              >
                Планы на сегодня
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/totalStatistics"}
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                className="text-gray-400 hover:text-white"
              >
                Общая статистика
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center">
            <p className="font-bold md:text-xl text-white mr-4">- {name} -</p>
            <div className="hidden md:flex justify-center items-center bg-gray-600  text-white rounded-sm px-4 py-2 hover:bg-gray-500">
              <button onClick={openWarning}>Выйти</button>
            </div>
            <Link to="/menu">
              <div
                className={classNames(
                  `tham tham-e-squeeze tham-w-6 bg-transparent md:hidden`,
                  {
                    "tham-active": opened,
                  },
                )}
              >
                <div className="tham-box">
                  <div className="tham-inner bg-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

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

export default NavBar;
