"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "@/app/_interfaces/Schedule";

export interface ScheduleState {
  lessons: Lesson[];
}

const initialState: ScheduleState = {
  lessons: [],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
  },
});

export const { setLessons } = scheduleSlice.actions;
export default scheduleSlice.reducer;
