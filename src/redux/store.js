import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import moviesSlice from "./slices/moviesSlice";
import listsSlice from "./slices/listsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    lists: listsSlice,
  },
});
