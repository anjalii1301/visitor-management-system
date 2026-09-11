import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/authSlice";
import visitorReducer from "../app/visitorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visitors: visitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;