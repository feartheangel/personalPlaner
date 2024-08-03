import React from "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CustomChart = () => {
  const tasks = useSelector((state: any) => state.taskToday);
  const allTasks = useSelector((state: any) => state.taskAllDays);
  const { pathname } = useLocation();
  const route = "/totalStatistics";
  const resize = window.screen.width;

  const data = [
    {
      value: Math.round(
        pathname === route
          ? allTasks.allPercentSuccessTask
          : tasks.percentSuccessTask,
      ),
      color: "green",
      name: "Выполнено",
    },
    {
      value:
        100 -
        Math.round(
          pathname === route
            ? allTasks.allPercentSuccessTask
            : tasks.percentSuccessTask,
        ),
      color: "red",
      name: "В процессе",
    },
  ];

  const sizing = {
    margin: { right: 5 },
    width: resize >= 768 ? 400 : 200,
    height: resize >= 768 ? 400 : 200,
    legend: { hidden: true },
  };

  return (
    <div className="flex">
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => `${item.name} (${item.value}%)`,
            arcLabelMinAngle: 45,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
            fontSize: resize >= 768 ? "18px" : "9px",
          },
        }}
        {...sizing}
      />

      <div className="flex flex-col justify-center items-center md:items-stretch text-white text-lg md:text-xl font-light">
        <p className="mb-4">
          Всего задач -{" "}
          {pathname === route ? allTasks.allTotalTasks : tasks.totalTask}
        </p>
        <p className="mb-4 text-green-400">
          Выполненных -{" "}
          {pathname === route ? allTasks.allCompletedTask : tasks.completedTask}
        </p>
        <p className="pb-4 text-red-400 border-b-2 border-gray-400">
          {pathname === route ? "Проваленных" : "В процессе"} -{" "}
          {pathname === route ? allTasks.allWorkingTask : tasks.workingTask}
        </p>
        <p className="mt-4 font-bold md:text-2xl">
          Процент успеха -{" "}
          {pathname === route
            ? allTasks.allPercentSuccessTask
            : tasks.percentSuccessTask}
          %
        </p>
      </div>
    </div>
  );
};

export default CustomChart;
