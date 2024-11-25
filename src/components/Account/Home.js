import React, { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";
import WeeklyStats from "./WeeklyStats";

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
      <Box sx={{ display: "flex", height: "80vh", width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justfiyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "16px",
          }}
        >
          <Button
            onClick={handleCreateWorkout}
            variant="contained"
            size="large"
            sx={{ maxWidth: "64px" }}
          >
            <AddCircleOutlineIcon />
          </Button>
          <WeeklyStats />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Workout;
