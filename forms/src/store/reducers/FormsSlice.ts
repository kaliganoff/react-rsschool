import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { uncontrolled: []; controlled: [] } = {
  uncontrolled: [],
  controlled: [],
};

export const FormsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    saveUncontrolled(state, action: PayloadAction<[]>) {
      state.uncontrolled.push(action.payload);
    },
    saveControlled(state, action: PayloadAction<[]>) {
      state.controlled.push(action.payload);
    },
  },
});

export default FormsSlice.reducer;
