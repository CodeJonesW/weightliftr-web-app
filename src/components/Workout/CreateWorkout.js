import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";

const Workout = () => {
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
  }, [workout_id, navigate]);

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
