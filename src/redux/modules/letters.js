import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/letterApi";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLetters = createAsyncThunk(
  "getletters",
  async (payload, thunkAPI) => {
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
    try {
      const res = await api.post("/letters", payload);
      thunkAPI.dispatch(__getLetters());
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetters = createAsyncThunk(
  "deleteLetters ",
  async (payload, thunkAPI) => {
    try {
      const res = await api.delete(`/letters/${payload}`, payload);
      thunkAPI.dispatch(__getLetters());
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __editLetters = createAsyncThunk(
  "editLetters ",
  async (payload, thunkAPI) => {
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
