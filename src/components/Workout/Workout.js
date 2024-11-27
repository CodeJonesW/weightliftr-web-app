import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkout,
  getWorkout,
  clearCurrentWorkout,
} from "../../redux/slices/workoutSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Exercise from "./Exercise";
import axios from "axios";
import WorkoutTitle from "./WorkoutTitle";
import NavBar from "../NavBar";
import { useParams, useNavigate } from "react-router-dom";

const Workout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { workout_id } = useParams();
  const { workout } = useSelector((state) => state.workoutSlice);
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

      if (workout.rows.length > 0) {
        const parsedRows = workout.rows.map((row) => {
          return `${row.distance}m row in ${row.time}`;
        });
        setWorkoutExercises([...parsedExercises, ...parsedRows]);
      } else {
        setWorkoutExercises(parsedExercises);
      }
    }
  }, [workout]);

  const handleDeleteWorkout = async () => {
    try {
      await dispatch(deleteWorkout({ token, workout_id }));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  const handleFinishWorkout = () => {
    try {
      dispatch(clearCurrentWorkout());
      navigate("/");
    } catch (error) {
      console.error("Failed to finish workout:", error);
    }
  };

  const handleAddExerciseToWorkout = async (exercise) => {
    const result = await axios.post(
      `/api/exercise/createExercise`,
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
    console.log(result);
    const savedExercise = `${exercise.reps} X ${exercise.sets} ${exercise.name} @ ${exercise.weight}`;
    setWorkoutExercises([...workoutExercises, savedExercise]);
  };

  const handleAddRowToWorkout = async (row) => {
    console.log("row", row);
    const result = await axios.post(
      `/api/exercise/createRow`,
      {
        workout_id,
        row,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    const savedRow = `${row.rowDistance}m in ${row.rowTime}`;
    setWorkoutExercises([...workoutExercises, savedRow]);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        className="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "scroll",
          background: theme.palette.background.default,
        }}
      >
        <Box style={{ width: "100%", paddingBottom: "24px" }}>
          <NavBar />
        </Box>
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
                      <WorkoutTitle />
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

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
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
                    <Exercise
                      addRow={handleAddRowToWorkout}
                      addExercise={handleAddExerciseToWorkout}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Workout;
