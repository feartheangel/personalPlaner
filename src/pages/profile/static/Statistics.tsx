import React, { useEffect, useState } from "react";
import CustomChart from "../../../components/CustomChart";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import { ITasksToday } from "../../../redux/feauters/taskAllDays/taskAllDays";

const Statistics = () => {
  const [activeDate, setActiveDate] = React.useState("");
  const [nowDay, setNowDay] = useState<ITasksToday | any>([]);
  const allDays = useSelector((state: any) => state.taskAllDays.allTasks);
  const sortDays = [...allDays];

  const handleChange = (event: SelectChangeEvent) => {
    setActiveDate(event.target.value as string);
  };

  useEffect(() => {
    const today: any = sortDays?.filter(
      (item: ITasksToday) => item.date === activeDate,
    );

    if (today.length) {
      // @ts-ignore
      setNowDay(...today);
    }
  }, [activeDate]);

  return (
    <div className="flex flex-col items-center py-4 px-4">
      <p className="font-bold md:text-2xl text-xl text-white mb-10">
        ОБЩАЯ СТАТИСТИКА ЗА ВСЕ ДНИ.
      </p>
      <div className="flex flex-wrap w-full">
        {/*Выбор дней и прошлые задачи*/}
        <div className="md:w-1/2 w-screen md:mb-0 mb-5">
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
              }}
              id="demo-simple-select-label"
            >
              Дата
            </InputLabel>
            <Select
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiInputLabel-formControl": {
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
              className="md:w-1/2"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ border: "white" }}
              value={activeDate}
              label="activeDate"
              onChange={handleChange}
            >
              {sortDays
                ?.sort(
                  (a, b) =>
                    +moment(b.date, "DD.MM.YY") - +moment(a.date, "DD.MM.YY"),
                )
                .map((day: any) => (
                  <MenuItem key={day.date} value={day.date}>
                    {day.date}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <div className="mt-5">
            <ul>
              {nowDay.tasks?.map((item: any, idx: number) => (
                <React.Fragment key={item.date}>
                  <li
                    className={
                      item.status
                        ? "md:w-1/2 mr-5 flex font-bold text-xl text-green-400 line-through decoration-white my-5"
                        : "md:w-1/2 mr-5 flex font-bold text-xl text-sky-50 my-5"
                    }
                  >
                    <span className="mr-2">{idx + 1}.</span>
                    {item.message}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        {/*  График общей статистики*/}
        <div className="md:w-1/2 w-screen border-t-2 border-gray-400 pt-8 md:border-none">
          <CustomChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
