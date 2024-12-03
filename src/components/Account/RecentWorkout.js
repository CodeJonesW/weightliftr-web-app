import { Box, Typography, Card } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkout } from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RecentWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const [latestWorkout, setLatestWorkout] = useState(null);

  useEffect(() => {
    const fetchLatestWorkout = async () => {
      const response = await axios.get(`/api/account/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLatestWorkout(
        response.data.workouts.length > 0 ? response.data.workouts[0] : null
      );
    };

    fetchLatestWorkout();
  }, [token]);

  const handleShowWorkout = (workout_id) => {
    localStorage.setItem("workout_id", workout_id);
    dispatch(setCurrentWorkout(workout_id));
    navigate(`/workout/${workout_id}`);
  };

  if (latestWorkout === null) {
    return null;
  }

  return (
    <Card
      key={latestWorkout.workout_id}
      style={{
        padding: "20px",
        borderRadius: "16px",
        width: "300px",
        height: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Recent Workout</Typography>
        <ArrowCircleRightIcon
          onClick={() => handleShowWorkout(latestWorkout.workout_id)}
        />
      </Box>
      <Box>
        <Typography>{latestWorkout.workout_text}</Typography>
        <Typography>{latestWorkout.created_at}</Typography>
      </Box>
    </Card>
  );
};

export default RecentWorkout;
