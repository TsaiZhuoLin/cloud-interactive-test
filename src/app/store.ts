import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { stockApi } from "../features/stock/stockApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
