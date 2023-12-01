import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  loginId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("받아온 데이터 값이다.", action.payload);
      const { accessToken, avatar, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("userId", userId);
      state.avatar = avatar;
      state.loginId = userId;
      state.isLogin = true;
      state.nickname = nickname;
    },
    logout: (state, action) => {
      localStorage.clear();
      return { ...state, isLogin: false };
    },
    signUp: (state, action) => {
      //   console.log("액션이다", action);
      state.user.push(action.payload);
    },
  },
});

export default authSlice.reducer;
export const { login, logout, signUp } = authSlice.actions;
