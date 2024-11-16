import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthToken } from "./authSlice";
import { setGoal } from "./goalSlice";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async ({ token }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`/api/account/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      dispatch(clearAuthToken());
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    createDailyTodo: (state, action) => {
      console.log("Creating daily todo", action.payload);
    },
    updateDailyTodo: (state, action) => {
      console.log("Updating daily todo", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { user } = action.payload;
        console.log("Got profile", action.payload);
        state.user = user;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("Error fetching profile:", action);
        state.error = true;
        state.loading = false;
      });
  },
});

export const { createDailyTodo, updateDailyTodo } = profileSlice.actions;

export default profileSlice;
