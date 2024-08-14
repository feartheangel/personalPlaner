import { createSlice } from "@reduxjs/toolkit";
import firstTask from "../../../assets/achievements/firstTask.png";
import twentyTask from "../../../assets/achievements/twentyTask.png";
import { toast } from "react-toastify";

export interface ITask {
  id: number | null;
  message: string;
  status: boolean;
}
export interface ITasksToday {
  tasks: ITask[];
  date: string;
  percentSuccessTask: number;
  totalTask: number;
  completedTask: number;
  workingTask: number;
}

export interface IAchievements {
  id: number;
  name: string;
  status: boolean;
  src: string;
  alt: string;
  description: string;
}
export interface IState {
  allTasks: ITasksToday[] | any;
  allPercentSuccessTask: number | undefined;
  allTotalTasks: number | undefined;
  allCompletedTask: number | undefined;
  allWorkingTask: number | undefined;
  achievements: IAchievements[];
}

const initialState: IState = {
  allTasks: [],
  allPercentSuccessTask: 0,
  allTotalTasks: 0,
  allCompletedTask: 0,
  allWorkingTask: 0,
  achievements: [
    {
      id: 1,
      name: "Первый шаг",
      status: false,
      src: firstTask,
      alt: "first",
      description: "Награда за 1-ую выполненную задачу!",
    },
    {
      id: 2,
      name: "Целеустремлённый",
      status: false,
      src: twentyTask,
      alt: "twentyTask",
      description: "Награда за 20-ую выполненную задачу!",
    },
  ],
};

const updateState = (state: IState, action: any) => {
  let allWorkingTask = 0;
  let allCompletedTask = 0;
  let allTotalTask = 0;

  const idx = state.allTasks.findIndex(
    (item: any) => item.date === action.payload.date,
  );

  if (idx === -1) {
    state.allTasks.push(action.payload);

    return;
  }

  state.allTasks[idx] = action.payload;

  state.allTasks.map((item: any) => {
    allWorkingTask += item.workingTask;
    allCompletedTask += item.completedTask;
    allTotalTask += item.totalTask;

    return null;
  });

  state.allPercentSuccessTask = Math.round(
    (allCompletedTask / allTotalTask) * 100,
  );
  state.allTotalTasks = allTotalTask;
  state.allCompletedTask = allCompletedTask;
  state.allWorkingTask = allWorkingTask;

  return;
};

const updateAchievements = (state: IState) => {
  if (state.achievements?.length) {
    if (state.allCompletedTask === 1 && !state.achievements[0].status) {
      state.achievements[0].status = true;
      toast.warning(`Получено достижение "${state.achievements[0].name}"`);

      return;
    }

    if (state.allCompletedTask === 20 && !state.achievements[1].status) {
      state.achievements[1].status = true;
      toast.warning(`Получено достижение "${state.achievements[1].name}"`);
      return;
    }
  }
};

const uploadState = (state: IState, action: any) => {
  state.allTasks = action.payload.allTasks;
  state.allPercentSuccessTask = action.payload.allPercentSuccessTask;
  state.allTotalTasks = action.payload.allTotalTasks;
  state.allCompletedTask = action.payload.allCompletedTask;
  state.allWorkingTask = action.payload.allWorkingTask;
  state.achievements = action.payload.achievements;
};

const taskAllDaysSlice = createSlice({
  name: "taskAllDays",
  initialState,
  reducers: {
    updateAllTask(state, action) {
      updateState(state, action);
      updateAchievements(state);
      localStorage.setItem("allTask", JSON.stringify(state));
    },
    uploadStateRTK(state, action) {
      uploadState(state, action);
    },
    removeTasks(state) {
      state.allTasks = [];
      state.allPercentSuccessTask = 0;
      state.allTotalTasks = 0;
      state.allCompletedTask = 0;
      state.allWorkingTask = 0;
      state.achievements[0].status = false;
      state.achievements[1].status = false;
    },
  },
});

export const { updateAllTask, uploadStateRTK, removeTasks } =
  taskAllDaysSlice.actions;

export default taskAllDaysSlice.reducer;
