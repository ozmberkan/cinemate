import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

const apiKey = import.meta.env.VITE_MOVIE_APP_KEY;

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=tr-TR`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.movies = action.payload.results;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
