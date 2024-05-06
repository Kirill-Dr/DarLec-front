"use client";
import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./features/scheduleSlice";
import homeworkReducer from "./features/homeworkSlice";

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
    homework: homeworkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
