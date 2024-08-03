import React from "react";
import Button from "@mui/material/Button";
import {
  completedTaskRTK,
  deleteTaskRTK,
  ITask,
} from "../../../../redux/feauters/taskToday/taskToday";
import { useDispatch } from "react-redux";

interface IProps {
  task: ITask;
  idx: number;
}

const TaskElement = ({ task, idx }: IProps) => {
  const dispatch = useDispatch();
  const completedTask = (e: any) => {
    e.preventDefault();
    dispatch(completedTaskRTK(task.id));
  };

  const deleteTask = (e: any) => {
    e.preventDefault();
    dispatch(deleteTaskRTK(task.id));
  };

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap md:justify-center justify-evenly items-center mb-6 last:mb-0 pb-5 md:pb-0 md:border-none border-b-2 border-y-gray-700">
      <Button
        variant="contained"
        color="success"
        onClick={(e) => completedTask(e)}
        className="order-2 md:order-1 mr-5 md:mr-0"
      >
        Выполнено
      </Button>
      <p
        className={
          task.status
            ? "md:w-1/2 w-full md:mx-5 mb-5 md:mb-0 flex font-bold text-xl text-green-400 line-through decoration-white order-1 md:order-2"
            : "md:w-1/2 w-full md:mx-5 mb-5 md:mb-0 flex font-bold text-xl text-sky-50 order-1 md:order-2"
        }
      >
        {idx + 1}. <span className="ml-2">{task.message}</span>
      </p>

      <Button
        onClick={(e) => deleteTask(e)}
        variant="outlined"
        color="error"
        className="order-3 md:order-3"
      >
        Удалить
      </Button>
    </div>
  );
};

export default TaskElement;
