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
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Fixed Button */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
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

      {/* Scrollable Content */}
      <Box
        sx={{
          marginTop: "96px", // Space to avoid overlap with the button
          height: "calc(100vh - 96px)", // Remaining height after button
          overflowY: "auto", // Enable scrolling
          paddingX: "16px", // Add horizontal padding
          paddingBottom: "16px", // Add bottom padding
          display: "flex", // Enable flexbox layout
          flexDirection: "column", // Stack children vertically
          alignItems: "center", // Center children horizontally
        }}
      >
        <WeeklyStats />
        <RecentWorkout />
      </Box>
    </motion.div>
  );
};

export default Home;
