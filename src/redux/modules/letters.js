import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/letterApi";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

//  2개의 input
// 1.이름 : 크게 의미는 없음
// 2. 함수: 비동기 요청을 위한
export const __getLetters = createAsyncThunk(
  "getletters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.get("/letters");
      console.log("불러온 레터스 값이다", res.data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("오류다 ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "getletters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.post("/letters", payload);
      console.log("추가한 레터스 값이다", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("추가한 레터스 오류다 ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deletedLetters = createAsyncThunk(
  "getletters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.post("http://localhost:5000/letters", payload);
      console.log("추가한 레터스 값이다", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("추가한 레터스 오류다 ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// const initialState = fakeData;

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    // addLetter: (state, action) => {
    // //   console.log(action);
    // //   return [...state, action.payload];
    // // },
    // deleteLetter: (state, action) => {
    //   return state.filter((letter) => letter.id !== action.payload);
    // },
    // editLetter: (state, action) => {
    //   const { id, editingText } = action.payload;
    //   return state.map((letter) => {
    //     if (letter.id === id) {
    //       return { ...letter, content: editingText };
    //     }
    //     return letter;
    //   });
    // },
  },
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      console.log("페이로드다", action.payload);
      state.isLoading = false;
      state.isError = false;
      console.log("asdf", state.letters);
      return (state.letters = action.payload);
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.push(action.payload);
    },
    [__addLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});
export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;

// export default letters;
