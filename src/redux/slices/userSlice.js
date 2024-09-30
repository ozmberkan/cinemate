import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "~/firebase/firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

export const registerService = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.username,
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        movies: [],
      };

      await setDoc(doc(collection(db, "users"), user.uid), userData);

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginService = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        movies: userDoc.data().movies || [],
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerService.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(registerService.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerService.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(loginService.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginService.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
