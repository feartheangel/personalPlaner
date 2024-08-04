import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  name: string | null;
  id: string | null;
  dateRegistration: string | null;
}
export interface IState {
  user: IUser;
}

const initialState: IState = {
  user: {
    name: null,
    id: null,
    dateRegistration: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user.name = null;
      state.user.id = null;
      state.user.dateRegistration = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("allTask");
    },
  },
});

export const { logout, logIn } = authSlice.actions;
export default authSlice.reducer;
