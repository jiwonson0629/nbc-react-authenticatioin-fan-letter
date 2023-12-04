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
  "getletters",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.get("/letters?_sort=createdAt&_order=desc");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetters = createAsyncThunk(
  "addletters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.post("/letters", payload);
      console.log("추가한 레터스 값이다", res);
      thunkAPI.dispatch(__getLetters());
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("추가한 레터스 오류다 ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetters = createAsyncThunk(
  "deleteLetters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    // console.log("삭제하고싶은 레터스 값이다", payload);
    try {
      const res = await api.delete(`/letters/${payload}`, payload);
      thunkAPI.dispatch(__getLetters());
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("오류다 ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __editLetters = createAsyncThunk(
  "editLetters ",
  async (payload, thunkAPI) => {
    //수행하고 싶은 동작 : 레터를 추가하기
    try {
      const res = await api.patch(`/letters/${payload.id}`, {
        content: payload.editingText,
      });
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // 추가
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
    // 삭제
    [__deleteLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
    },
    [__deleteLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // 수정
    [__editLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__editLetters.fulfilled]: (state, action) => {
      const editLetter = state.letters.findIndex((letter) => {
        return letter.id === action.payload.id;
      });
      console.log("에디트 레터다 ", editLetter);
      state.letters.splice(editLetter, 1, action.payload);

      state.isLoading = false;
      state.isError = false;
    },
    [__editLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});
export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;

// export default letters;
