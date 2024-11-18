import React, { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Card, TextField, Grid, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkout,
} from "../../redux/slices/workoutSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const Workout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const { workout_id, workout } = useSelector((state) => state.workoutSlice);
  const [loading, setLoading] = useState(false);
  const [textFieldRows, setTextFieldRows] = useState(1);
  const cardRef = useRef(null);
  const [workout_text, setWorkoutText] = useState(
    workout ? workout.workout_text : ""
  );

  useEffect(() => {
    if (workout_id) {
      dispatch(getWorkout({ token, workout_id }));
    }
  }, [workout_id, dispatch, token]);

  useEffect(() => {
    if (workout) {
      setWorkoutText(workout.workout_text);
    }
  }, [workout]);

  useEffect(() => {
    if (cardRef.current) {
      const cardHeight = cardRef.current.offsetHeight;
      const lineHeight = 32;
      const padding = 72;
      const rows = Math.floor((cardHeight - padding) / lineHeight);
      setTextFieldRows(rows > 0 ? rows : 1);
    }
  }, [cardRef, workout_id]);

  const handleCreateWorkout = async () => {
    dispatch(createWorkout({ token }));
  };

  const handleDeleteWorkout = async () => {
    dispatch(deleteWorkout({ token, workout_id }));
  };

  const handleFinishWorkout = () => {
    dispatch(updateWorkout({ token, workout_id, workout_text }));
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
            ref={cardRef}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingBottom: "16px",
              }}
            >
              {workout_id ? (
                <Box>
                  <IconButton onClick={handleFinishWorkout}>
                    <CheckIcon color="text.secondary" />
                  </IconButton>
                  <IconButton
                    color="text.secondary"
                    onClick={handleDeleteWorkout}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : null}
            </Box>
            {!workout_id ? (
              <Button
                onClick={handleCreateWorkout}
                variant="contained"
                disabled={loading}
                size="large"
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <AddCircleOutlineIcon />
                )}
              </Button>
            ) : (
              <TextField
                fullWidth
                multiline
                rows={textFieldRows}
                placeholder="Enter workout details..."
                value={workout_text}
                onChange={(e) => setWorkoutText(e.target.value)}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Workout;
