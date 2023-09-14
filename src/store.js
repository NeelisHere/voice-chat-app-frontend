import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";
import { activateSlice } from "./slices/activateSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activate: activateSlice.reducer
  },
});

export default store;