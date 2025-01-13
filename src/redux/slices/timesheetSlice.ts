// slices/timesheetSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimesheetState {
  status: string | undefined; // Status of the timesheet
  showStatusTag:boolean;
  statusOfAllTImeSheet:string | undefined;
  statusOfPastDueTimesheet:string | undefined;
  statusOfAcceptedTimesheet:string | undefined;
  statusOfRejectedTimesheet:string | undefined;
  activeTabKey: string;
  showDetailedView: boolean;
}

const initialState: TimesheetState = {
  status: undefined, // Default status
  showStatusTag:true,
  statusOfAllTImeSheet:undefined,
  statusOfPastDueTimesheet:undefined,
  statusOfAcceptedTimesheet:undefined,
  statusOfRejectedTimesheet:undefined,
  activeTabKey: "1",
  showDetailedView: false
};

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload; // Update the status in global state
    },
    setShowStatusTag: (state, action: PayloadAction<boolean>) => {
        state.showStatusTag = action.payload;
    },
    setStatusOfAllTImeSheet: (state, action: PayloadAction<string | undefined>) => {
        state.statusOfAllTImeSheet = action.payload;
    },
    setStatusOfPastDueTimesheet: (state, action: PayloadAction<string | undefined>) => {
        state.statusOfPastDueTimesheet = action.payload;
    },
    setStatusOfAcceptedTimesheet: (state, action: PayloadAction<string | undefined>) => {
        state.statusOfAcceptedTimesheet = action.payload;
    },
    setStatusOfRejectedTimesheet: (state, action: PayloadAction<string | undefined>) => {
        state.statusOfRejectedTimesheet = action.payload;
    },
    setActiveTabkey: (state, action: PayloadAction<string>) => {
        state.activeTabKey = action.payload;
    },
    setShowDetailedView: (state, action: PayloadAction<boolean>) => {
        state.showDetailedView = action.payload;
    }
  },
});

export const { setStatus, setShowStatusTag, setStatusOfAllTImeSheet, setStatusOfPastDueTimesheet, setStatusOfAcceptedTimesheet, setStatusOfRejectedTimesheet,setActiveTabkey,setShowDetailedView } = timesheetSlice.actions;

export default timesheetSlice.reducer;
