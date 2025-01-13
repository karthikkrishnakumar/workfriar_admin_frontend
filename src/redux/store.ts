import { configureStore } from '@reduxjs/toolkit';
import  modalReducer  from './slices/modalSlice';
import timesheetReducer from "./slices/timesheetSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    timesheet: timesheetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
