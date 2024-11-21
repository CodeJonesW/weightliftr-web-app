import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  setCurrentWorkout,
} from "../../redux/slices/workoutSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Exercise from "./Exercise";
import axios from "axios";
import WorkoutTitle from "./WorkoutTitle";

const Workout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { workout_id, workout } = useSelector((state) => state.workoutSlice);
  const [workoutExercises, setWorkoutExercises] = useState([]);

  useEffect(() => {
    if (workout_id) {
      dispatch(getWorkout({ token, workout_id }));
    }
  }, [workout_id, dispatch, token]);

  useEffect(() => {
    if (workout && workout.exercises.length > 0) {
      const parsedExercises = workout.exercises.map((exercise) => {
        return `${exercise.reps} X ${exercise.sets} ${exercise.name} @ ${exercise.weight}`;
      });
      setWorkoutExercises(parsedExercises);
    }
  }, [workout]);

  const handleCreateWorkout = async () => {
    dispatch(createWorkout({ token }));
  };

  const handleDeleteWorkout = async () => {
    dispatch(deleteWorkout({ token, workout_id }));
  };

  const handleFinishWorkout = () => {
    dispatch(setCurrentWorkout(null));
  };

  const handleAddExerciseToWorkout = async (exercise) => {
    await axios.post(
      "api/exercise/createExercise",
      {
        workout_id,
        exercise,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const savedExercise = `${exercise.reps} X ${exercise.sets} ${exercise.name} @ ${exercise.weight}`;
    setWorkoutExercises([...workoutExercises, savedExercise]);
  };

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
          <Card
            sx={{
              height: "90%",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "24px",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
            }}
          >
            {workout ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                }}
              >
                <Box>
                  <WorkoutTitle workoutTitle={workout.meta.workout_title} />
                </Box>
                <Box>
                  <IconButton onClick={handleFinishWorkout}>
                    <SaveIcon color="text.secondary" />
                  </IconButton>
                  <IconButton
                    color="text.secondary"
                    onClick={handleDeleteWorkout}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : null}

            {!workout_id ? (
              <Button
                onClick={handleCreateWorkout}
                variant="contained"
                size="large"
              >
                <AddCircleOutlineIcon />
              </Button>
            ) : (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {workoutExercises.map((exercise, index) => {
                    return (
                      <Typography key={index} variant="body1">
                        {exercise}
                      </Typography>
                    );
                  })}
                </Box>
                <Box sx={{ paddingTop: "8px", paddingBottom: "16px" }}>
                  <Divider />
                </Box>
                <Box>
                  <Exercise addExercise={handleAddExerciseToWorkout} />
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Workout;
