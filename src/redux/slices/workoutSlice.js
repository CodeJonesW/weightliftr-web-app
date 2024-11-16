import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createWorkout = createAsyncThunk(
  "workout/createWorkout",
  async ({ token }) => {
    console.log("Creating workout... action", token);
    const response = await axios.post(
      `/api/workout/createWorkout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "wf-workout": "true",
        },
      }
    );
    return response.data;
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout_id: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workout_id = action.payload.workout_id;
        state.loading = false;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default workoutSlice;
