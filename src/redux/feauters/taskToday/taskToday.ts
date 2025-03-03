import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { ITasksToday } from "../taskAllDays/taskAllDays";
import { toast } from "react-toastify";

export interface ITask {
  id: number | null;
  message: string;
  status: boolean;
}

export interface IState {
  tasks: ITask[];
  date: string;
  percentSuccessTask: number | undefined;
  totalTask: number;
  completedTask: number;
  workingTask: number;
  selectDate: string;
}

export const momentNow = moment().format("DD-MM-YYYY");

const initialState: IState = {
  tasks: [],
  date: momentNow,
  percentSuccessTask: 0,
  completedTask: 0,
  workingTask: 0,
  totalTask: 0,
  selectDate: momentNow,
};

export const percent = (state: IState) => {
  if (state.tasks) {
    const completed = state.tasks.filter((item: ITask) => item.status);

    state.completedTask = completed.length;
    state.workingTask = state.tasks.length - completed.length;

    if (completed) {
      const result = (completed.length / state.tasks.length) * 100;

      if (result) {
        return Math.round(result);
      }
    }

    return 0;
  }

  return 0;
};

const completedTaskHandler = (state: IState, id: number) => {
  return state.tasks.map((item: ITask) => {
    if (item.id === id) {
      item.status = !item.status;

      item.status ? toast.success("Выполнено!") : toast.error("Отменено!");
    }
    return null;
  });
};

const changeTaskHandler = (
  state: IState,
  info: { text: string; id: number },
) => {
  let idx = state.tasks.findIndex((item: any) => item.id === info.id);
  state.tasks[idx].message = info.text;
  toast.success("Сохранено!");
};

const deleteTaskHandler = (state: IState, id: number) => {
  state.tasks = state.tasks.filter((item: ITask) => item.id !== id);
  toast.error("Удалено!");
};

const taskTodaySlice = createSlice({
  name: "taskToday",
  initialState,
  reducers: {
    saveTask: (state, action) => {
      toast.success("Задача создана!");
      state.tasks?.push(action.payload.today);
      state.date = action.payload.dateNow;
      state.totalTask = state.tasks.length;
      state.percentSuccessTask = percent(state);
    },
    completedTaskRTK: (state, action) => {
      completedTaskHandler(state, action.payload);
      state.totalTask = state.tasks.length;
      state.percentSuccessTask = percent(state);
    },
    deleteTaskRTK: (state, action) => {
      deleteTaskHandler(state, action.payload);
      state.totalTask = state.tasks.length;
      state.percentSuccessTask = percent(state);
    },
    changeTaskRTK: (state, action) => {
      changeTaskHandler(state, action.payload);
    },
    uploadTodayRTK: (state, action) => {
      state.tasks = action.payload.tasks;
      state.date = state.selectDate;
      state.percentSuccessTask = action.payload.percentSuccessTask;
      state.completedTask = action.payload.completedTask;
      state.workingTask = action.payload.workingTask;
      state.totalTask = action.payload.totalTask;
    },
    clearTask: (state) => {
      state.tasks = [];
      state.date = "";
      state.percentSuccessTask = 0;
      state.completedTask = 0;
      state.workingTask = 0;
      state.totalTask = 0;
    },
    todaySelectDate: (state, action) => {
      state.selectDate = action.payload;
      state.date = action.payload;

      let uploadData = localStorage.getItem("allTask");
      let tasksActive = [];

      if (uploadData) {
        const data = JSON.parse(uploadData);
        const selectDate = action.payload ? action.payload : momentNow;

        const today: any = data?.allTasks?.filter(
          (item: ITasksToday) => item.date === selectDate,
        );
        tasksActive = today[0]?.tasks;

        state.tasks = tasksActive ? tasksActive : [];
        state.percentSuccessTask = today[0] ? today[0].percentSuccessTask : 0;
        state.completedTask = today[0] ? today[0].completedTask : 0;
        state.workingTask = today[0] ? today[0].workingTask : 0;
        state.totalTask = today[0] ? today[0].totalTask : 0;
      }
    },
  },
});

export const {
  saveTask,
  completedTaskRTK,
  deleteTaskRTK,
  uploadTodayRTK,
  clearTask,
  todaySelectDate,
  changeTaskRTK,
} = taskTodaySlice.actions;

export default taskTodaySlice.reducer;
