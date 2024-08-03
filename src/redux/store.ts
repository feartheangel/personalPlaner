import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/feauters/auth/authSlice";
import taskTodaySlice from "./feauters/taskToday/taskToday";
import taskAllDaysSlice from "./feauters/taskAllDays/taskAllDays";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    taskToday: taskTodaySlice,
    taskAllDays: taskAllDaysSlice,
  },
});
