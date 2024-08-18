import { createSlice } from "@reduxjs/toolkit";

const initialState: { uncontrolled: []; controlled: [] } = {
  uncontrolled: [],
  controlled: [],
};

export const FormsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    saveUncontrolled(state, action) {
      state.uncontrolled.push(action.payload);
    },
    saveControlled(state, action) {
      state.controlled.push(action.payload);
    },
  },
});

export default FormsSlice.reducer;
