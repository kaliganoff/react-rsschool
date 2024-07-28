import { createSlice } from "@reduxjs/toolkit";
import { ResultsItem } from "../../interfaces/interfaces";

const initialState: { ids: ResultsItem[] } = {
  ids: [],
};

export const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    save(state, action) {
      state.ids.push(action.payload);
    },
    del(state, action) {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    },
    delAll(state) {
      state.ids = [];
    },
  },
});

export default PageSlice.reducer;
