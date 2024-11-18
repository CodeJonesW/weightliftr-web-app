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
        },
      }
    );
    return response.data;
  }
);

export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",
  async ({ token, workout_id }) => {
    console.log("Deleting workout... action", token, workout_id);
    const response = await axios.post(
      `/api/workout/deleteWorkout`,
      { workout_id: workout_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const getWorkout = createAsyncThunk(
  "workout/getWorkout",
  async ({ workout_id, token }) => {
    console.log("Getting workout... action", workout_id, token);
    const response = await axios.post(
      `/api/workout/getWorkout`,
      { workout_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",
  async ({ workout_id, workout_text, token }) => {
    console.log("Updating workout... action", workout_id, workout_text, token);
    const response = await axios.post(
      `/api/workout/updateWorkout`,
      { workout_id, workout_text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout_id: localStorage.getItem("workout_id") || null,
    workout: null,
    loading: false,
    error: false,
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
        localStorage.setItem("workout_id", action.payload.workout_id);
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        console.log("deleteWorkout.fulfilled");
        state.workout_id = null;
        state.loading = false;
        localStorage.removeItem("workout_id");
      })
      .addCase(deleteWorkout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(getWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(getWorkout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(updateWorkout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default workoutSlice;
