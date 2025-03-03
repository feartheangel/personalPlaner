import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { uid } from "uid";
import { useDispatch } from "react-redux";
import {
  saveTask,
  todaySelectDate,
} from "../../../../redux/feauters/taskToday/taskToday";
import { toast } from "react-toastify";
import DatePickerCustom from "../../../../components/DatePickerCustom";

const CreateTask = () => {
  const momentNow = moment().format("DD-MM-YYYY");
  const [textTask, setTextTask] = useState<string>("");
  const [dateNow, setDateNow] = useState(momentNow);
  const dispatch = useDispatch();
  const changeTextHandler = (e: string) => {
    setTextTask(e);
  };

  const createTaskHandler = (e: any) => {
    e.preventDefault();

    const totalData = {
      today: {
        id: uid(),
        message: textTask,
        status: false,
      },
      dateNow: dateNow,
    };

    if (!textTask.length) {
      toast.error("Заполните поле ввода задачи!");
      return;
    }
    dispatch(saveTask(totalData));
    setTextTask("");
  };

  useEffect(() => {
    dispatch(todaySelectDate(dateNow));
  }, [dateNow]);

  return (
    <div className="flex flex-col md:flex md:flex-row justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="md:w-6/12 w-5/12 md:order-2">
          <DatePickerCustom setDateNow={setDateNow} />
        </div>
        <p className="md:mr-5 ml-5 md:ml-0 md:order-1">
          Сегодня:{" "}
          <span className="text-xl text-sky-50 font-bold">{momentNow}</span>{" "}
        </p>
      </div>

      <form className="md:w-1/2 w-full flex flex-col md:flex-row justify-end mt-10 md:mt-0">
        <label>Введите задачу:</label>

        <div className="flex md:w-8/12 mt-4 md:mt-0">
          <input
            value={textTask}
            onChange={(e) => changeTextHandler(e.target.value)}
            className="bg-gray-400 md:px-4  py-2 text-white text-xl rounded md:mx-4 mr-4 md:w-9/12 w-8/12"
            id="outlined-password-input"
            placeholder="новая задача"
            type="text"
          />
          <button
            onClick={(e) => createTaskHandler(e)}
            className="px-4 py-2 text-xs md:text-base text-white bg-green-400 rounded hover:bg-green-600 md:w-max w-4/12"
          >
            Создать
            <SendIcon className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
