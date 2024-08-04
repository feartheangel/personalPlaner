import React, { useState } from "react";
import oldCement from "../../../assets/auth/SL_0210121_40570_75.jpg";
import { toast } from "react-toastify";
import { uid } from "uid";
import moment from "moment";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/feauters/auth/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = (e: any) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Введите ваше имя...");
    }

    const momentNow = moment().format("DD-MM-YYYY");

    const totalData = {
      name: name,
      id: uid(25),
      dateRegistration: momentNow,
    };

    dispatch(logIn(totalData));
    // @ts-ignore
    localStorage.setItem("userInfo", JSON.stringify(totalData));
    navigate("/");
    setName("");
  };
  const changeName = (e: string) => {
    setName(e.toUpperCase());
  };

  return (
    <div className="relative h-screen overscroll-y-contain">
      <img
        className="w-screen md:h-screen h-full overscroll-y-contain bg-cover relative flex justify-center items-center"
        src={oldCement}
        alt="background"
      />

      <form className="absolute top-1/3 -right-0 mx-4 md:top-1/4 md:left-1/4">
        <p className="text-white text-2xl md:text-2xl md:w-1/4">
          Personal planner - твой личный персональный помощник для контроля
          своих задач и статистики.
        </p>
        <div className="relative md:h-18 h-12 w-full md:max-w-[250px] mt-8 md:mt-6">
          <input
            value={name}
            onChange={(e) => changeName(e.target.value)}
            type="text"
            className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal  !text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=""
            maxLength={13}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight !text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Введите имя
          </label>
        </div>

        <button
          type="submit"
          onClick={(e) => registerHandler(e)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-4 md:py-2 md:px-4 rounded inline-flex items-center mt-10 md:mt-6"
        >
          <span className="text-2xl md:text-xl">Зарегистрировать</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
