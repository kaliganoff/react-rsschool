import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
  count: 0,
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
  },
});

export default PageSlice.reducer;
