import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ToastItemProps as TToast } from "../../components/Toast/ToastItem";

type ToastsSlice = {
  toasts: TToast[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: ToastsSlice = {
  toasts: [
    {
      id: "1",
      message: "This is a success message",
      type: "warning",
      title: "It worked!",
      position: "bottom-right",
    },
    {
      id: "2",
      message: "This is a success message",
      type: "info",
      title: "It worked!",
      position: "bottom-center",
    },
  ],
};

const emptyState: ToastsSlice = {
  toasts: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState: emptyState,
  reducers: {
    removeToast: (state, action: PayloadAction<{ id: TToast["id"] }>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload.id
      );
    },
    addToast: (state, action: PayloadAction<Omit<TToast, "id">>) => {
      state.toasts.push({
        id: nanoid(),
        ...action.payload,
      });
    },
  },
});

export const toastReducer = toastsSlice.reducer;
export const { removeToast, addToast } = toastsSlice.actions;
