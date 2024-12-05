import React, { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";
import WeeklyStats from "./WeeklyStats";
import RecentWorkout from "./RecentWorkout";

const Home = () => {
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
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none", // For Chrome, Edge, and Safari
        },
      }} // Prevent default scrollbar
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleCreateWorkout}
          variant="contained"
          size="large"
          sx={{ maxWidth: "150px", height: "64px" }}
        >
          <AddCircleOutlineIcon />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WeeklyStats />
        <RecentWorkout />
      </Box>
    </motion.div>
  );
};

export default Home;
