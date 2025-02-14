import { configureStore } from "@reduxjs/toolkit";
import { toastReducer } from "./toast/toastsSlice";

export const store = configureStore({
  reducer: {
    toasts: toastReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
