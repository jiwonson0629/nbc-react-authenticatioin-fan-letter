import { createSlice } from "@reduxjs/toolkit";

const initialState = "카리나";

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMember: (state, action) => {
      return action.payload;
    },
  },
});

export default memberSlice.reducer;
export const { setMember } = memberSlice.actions;

// export default member;
