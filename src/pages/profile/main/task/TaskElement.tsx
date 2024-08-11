import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  changeTaskRTK,
  completedTaskRTK,
  deleteTaskRTK,
  ITask,
} from "../../../../redux/feauters/taskToday/taskToday";
import { useDispatch } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";

interface IProps {
  task: ITask;
  idx: number;
}

const TaskElement = ({ task, idx }: IProps) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(task.message);
  const dispatch = useDispatch();
  const completedTask = (e: any) => {
    e.preventDefault();
    if (openForm) {
      const totalData = {
        text: newText,
        id: task.id,
      };
      dispatch(changeTaskRTK(totalData));
      setOpenForm(false);
      return;
    }

    dispatch(completedTaskRTK(task.id));
  };

  const deleteTask = (e: any) => {
    e.preventDefault();
    if (openForm) {
      setNewText(task.message);
      return setOpenForm(false);
    }
    dispatch(deleteTaskRTK(task.id));
  };

  const openChangeField = () => {
    setOpenForm(true);
  };

  const changeTextHandler = (e: React.SetStateAction<string>) => {
    setNewText(e);
  };

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap md:justify-center justify-around items-center mb-6 last:mb-0 pb-5 md:pb-0 md:border-none border-b-2 border-y-gray-700 last:border-none">
      <Button
        variant="contained"
        color={!task.status ? "success" : "error"}
        onClick={(e) => completedTask(e)}
        className="order-2 md:order-1 mr-5 md:mr-0 md:w-2/12 w-5/12"
      >
        {openForm ? "Сохранить" : task.status ? "Отменить" : "Выполнить"}
      </Button>
      {openForm ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => changeTextHandler(e.target.value)}
          className="md:w-1/2 w-full md:mx-5 mb-5 md:mb-0 flex font-bold text-xl order-1 md:order-2 px-3 h-8"
        />
      ) : (
        <p
          className={
            task.status
              ? "md:w-1/2 w-full md:mx-5 mb-5 md:mb-0 flex font-bold text-xl text-green-400 line-through decoration-white order-1 md:order-2"
              : "md:w-1/2 w-full md:mx-5 mb-5 md:mb-0 flex font-bold text-xl text-sky-50 order-1 md:order-2"
          }
        >
          {idx + 1}. <span className="ml-2">{task.message}</span>
        </p>
      )}

      <div className="order-3 md:order-3 md:w-3/12">
        <CreateIcon
          className="hover:cursor-pointer"
          onClick={openChangeField}
        />

        <Button
          style={{ marginLeft: "20px" }}
          onClick={(e) => deleteTask(e)}
          variant="outlined"
          color="error"
          className="w-8/12 ml-5"
        >
          {openForm ? "Отменить" : "Удалить"}
        </Button>
      </div>
    </div>
  );
};

export default TaskElement;
