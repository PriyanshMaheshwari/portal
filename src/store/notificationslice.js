import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getInitialState } from "../util/sliceHelpers";
import { notificationSchema } from "../constants/schemas";

const initialState = getInitialState(notificationSchema);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setField(state, action) {
      state[action.payload.field] = action.payload.value;
    },
  },
});

const store = configureStore({
  reducer: { notification: notificationSlice.reducer },
});

export const notificationActions = notificationSlice.actions;
export default store;
