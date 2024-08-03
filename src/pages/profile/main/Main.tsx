import React, { useEffect } from "react";
import TaskElement from "./task/TaskElement";
import CustomChart from "../../../components/CustomChart";
import CreateTask from "./createTask/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { ITask } from "../../../redux/feauters/taskToday/taskToday";
import { updateAllTask } from "../../../redux/feauters/taskAllDays/taskAllDays";

const Main = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.taskToday.tasks);
  const totalDay = useSelector((state: any) => state.taskToday);

  useEffect(() => {
    if (totalDay.totalTask) {
      dispatch(updateAllTask(totalDay));
    }
  }, [totalDay.totalTask, totalDay.completedTask, tasks.length]);

  const emptyTasks = () => {
    if (tasks.length === 0) {
      return <p className="text-xl font-bold">Активных задач нет...</p>;
    }
  };

  return (
    <div className="w-full px-4 my-6">
      {/*module 1*/}
      <CreateTask />
      {/*module 2*/}
      <div className="flex flex-col md:flex-row md:mt-20 mt-14 justify-evenly">
        <div className="md:w-1/2 md:px-10 md:py-10 px-5 py-5 border flex flex-col justify-center items-center">
          {emptyTasks()}
          {tasks?.map((task: ITask, idx: number) => (
            <React.Fragment key={task.id}>
              <TaskElement task={task} idx={idx} />
            </React.Fragment>
          ))}
        </div>
        <div className="md:w-1/2 mt-14 md:mt-0">
          <CustomChart />
        </div>
      </div>
    </div>
  );
};

export default Main;
