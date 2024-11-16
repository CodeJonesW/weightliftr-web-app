import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Card,
  TextField,
  FormGroup,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import TuneIcon from "@mui/icons-material/Tune";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../redux/slices/workoutSlice";

const Workout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { workout_id } = useSelector((state) => state.workoutSlice);
  const { token } = useSelector((state) => state.authSlice);

  const handleCreateWorkout = async () => {
    console.log("Creating workout...");
    dispatch(createWorkout({ token }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box sx={{ padding: "24px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            width: "300px",
          }}
        >
          {!workout_id ? (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleCreateWorkout}
                variant={"contained"}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <AddCircleOutlineIcon />
                )}
              </Button>
            </Box>
          ) : (
            <Card>
              <TextField sx={{ width: "100%", height: "100%" }} />
            </Card>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Workout;
