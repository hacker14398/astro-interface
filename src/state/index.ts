import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import walletReducer from "./wallet/slice";
import questionReducer from "./questions/slice";
import nftReducer from "./nft/slice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    questions: questionReducer,
    nft: nftReducer,
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
