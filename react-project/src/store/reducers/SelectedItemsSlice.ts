import { createSlice } from "@reduxjs/toolkit";
import { ResultsItem } from "../../interfaces/interfaces";

const initialState: { items: ResultsItem[] } = {
  items: [],
};

export const SelectedItemsSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    save(state, action: { payload: ResultsItem}) {
      state.items.push(action.payload);
    },
    del(state, action: { payload: ResultsItem}) {
      state.items.splice(state.items.indexOf(action.payload), 1);
    },
    delAll(state) {
      state.items = [];
    },
  },
});

export default SelectedItemsSlice.reducer;
