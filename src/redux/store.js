import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import moviesSlice from "./slices/moviesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
  },
});
