import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { stockApi } from "../features/stock/stockApi";

export const store = configureStore({
  reducer: {
    [stockApi.reducerPath]: stockApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
