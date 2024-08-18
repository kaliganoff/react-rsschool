import { configureStore } from "@reduxjs/toolkit";
import FormsReducer from "./reducers/FormsSlice";

export const store = configureStore({
  reducer: { FormsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
