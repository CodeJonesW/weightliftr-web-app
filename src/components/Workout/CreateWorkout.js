import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  clearCurrentWorkout,
} from "../../redux/slices/workoutSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Exercise from "./Exercise";
import axios from "axios";
import WorkoutTitle from "./WorkoutTitle";
import { useNavigate } from "react-router-dom";

const Workout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { workout_id } = useSelector((state) => state.workoutSlice);

  const handleCreateWorkout = async () => {
    dispatch(createWorkout({ token }));
  };

  useEffect(() => {
    if (workout_id) {
      navigate(`/workout/${workout_id}`);
    }
  }, [workout_id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Grid
        container
        sx={{ height: "80vh" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={6} sx={{ height: "100%" }}>
          <Button
            onClick={handleCreateWorkout}
            variant="contained"
            size="large"
          >
            <AddCircleOutlineIcon />
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Workout;
