import { createSlice } from "@reduxjs/toolkit";
import { ResultsItem } from "../../interfaces/interfaces";

const initialState: { items: ResultsItem[] } = {
  items: [],
};

export const SelectedItemsSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    save(state, action) {
      state.items.push(action.payload);
    },
    del(state, action) {
      state.items.splice(state.items.indexOf(action.payload), 1);
    },
    delAll(state) {
      state.items = [];
    },
  },
});

export default SelectedItemsSlice.reducer;
