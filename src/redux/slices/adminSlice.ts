import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  token: string | null;
}

const initialState: AdminState = {
  token: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;

    },
    clearToken(state) {
      state.token = null;
      // Optionally, clear the cookie here if necessary
    },
  },
});

export const { setToken, clearToken } = adminSlice.actions;
export default adminSlice.reducer;
