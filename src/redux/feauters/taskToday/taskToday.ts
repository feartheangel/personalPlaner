import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";

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
}

export const momentNow = moment().format("DD-MM-YYYY");

const initialState: IState = {
  tasks: [],
  date: momentNow,
  percentSuccessTask: 0,
  completedTask: 0,
  workingTask: 0,
  totalTask: 0,
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
    }
  });
};

const deleteTaskHandler = (state: IState, id: number) => {
  state.tasks = state.tasks.filter((item: ITask) => item.id !== id);
};

const taskTodaySlice = createSlice({
  name: "taskToday",
  initialState,
  reducers: {
    saveTask: (state, action) => {
      state.tasks.push(action.payload);
      state.date = momentNow;
      // "20-07-2024"
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
    uploadTodayRTK: (state, action) => {
      state.tasks = action.payload.tasks;
      state.date = action.payload.date;
      state.percentSuccessTask = action.payload.percentSuccessTask;
      state.completedTask = action.payload.completedTask;
      state.workingTask = action.payload.workingTask;
      state.totalTask = action.payload.totalTask;
    },
  },
});

export const { saveTask, completedTaskRTK, deleteTaskRTK, uploadTodayRTK } =
  taskTodaySlice.actions;

export default taskTodaySlice.reducer;
