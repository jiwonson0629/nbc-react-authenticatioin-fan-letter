import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { type, payload }) => {
      return { ...state, isLogin: true };
    },
    logout: (state, { type, payload }) => {
      return { ...state, isLogin: false };
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
