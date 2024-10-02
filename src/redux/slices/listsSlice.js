import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase/firebase";

const initialState = {
  lists: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const getAllLists = createAsyncThunk(
  "lists/getAllLists",
  async (_, { rejectWithValue }) => {
    try {
      const listsRef = collection(db, "lists");
      const snapshot = await getDocs(listsRef);

      const data = snapshot.docs.map((doc) => doc.data());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLists.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getAllLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const {} = listsSlice.actions;

export default listsSlice.reducer;
