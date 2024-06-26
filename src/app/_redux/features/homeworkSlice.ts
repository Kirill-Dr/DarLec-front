"use client";

import { Homework } from "@/app/_interfaces/Homework";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HomeworkState {
  homework: Homework[];
}

const initialState: HomeworkState = {
  homework: [],
};

export const homeworkSlice = createSlice({
  name: "homework",
  initialState,
  reducers: {
    setHomework: (state, action: PayloadAction<Homework[]>) => {
      state.homework = action.payload;
    },
    resetHomework: () => initialState,
  },
});

export const { setHomework, resetHomework } = homeworkSlice.actions;
export default homeworkSlice.reducer;
