import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
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
