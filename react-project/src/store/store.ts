import { configureStore } from "@reduxjs/toolkit";
import { searchAPI } from "../services/search";
import SelectedItemsReducer from "../store/reducers/PageSlice";

export const store = configureStore({
  reducer: { SelectedItemsReducer, [searchAPI.reducerPath]: searchAPI.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
