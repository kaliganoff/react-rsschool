import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  current: 1,
};

export const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
});
