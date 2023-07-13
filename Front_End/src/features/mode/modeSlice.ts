import { createSlice } from "@reduxjs/toolkit";

const initialState: modeState = {
  mode: "dark",
};

const modeSlice = createSlice({
  name: "Mode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
