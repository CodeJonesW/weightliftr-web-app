import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createWorkout = createAsyncThunk(
  "workout/createWorkout",
  async ({ token }) => {
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
    console.log(response);
    return response.data;
  }
);

export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",
  async ({ workout_id, workout_title, token }) => {
    await axios.post(
      `/api/workout/updateWorkout`,
      { workout_id, workout_title },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { workout_title };
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
  reducers: {
    setCurrentWorkout: (state, action) => {
      state.workout_id = action.payload;
      localStorage.setItem("workout_id", action.payload);
    },
    clearCurrentWorkout: (state) => {
      state.workout_id = null;
      state.workout = null;
      localStorage.removeItem("workout_id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workout_id = action.payload.workout_id;
        localStorage.setItem("workout_id", action.payload.workout_id);
        state.loading = false;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        state.workout_id = null;
        state.loading = false;
        state.workout = null;
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
        state.workout.meta.title = action.payload;
      })
      .addCase(updateWorkout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { setCurrentWorkout, setWorkoutTitle } = workoutSlice.actions;

export default workoutSlice;
