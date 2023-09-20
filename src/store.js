import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";
import { activateSlice } from "./slices/activateSlice";
import { roomSlice } from "./slices/roomSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activate: activateSlice.reducer,
    room: roomSlice.reducer
  },
});

export default store;