import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import { updateWorkout } from "../../redux/slices/workoutSlice";
import { useDispatch, useSelector } from "react-redux";

const WorkoutTitle = () => {
  const dispatch = useDispatch();
  const { workout } = useSelector((state) => state.workoutSlice);
  const { token } = useSelector((state) => state.authSlice);
  const [title, setTitle] = useState(
    workout?.meta?.workout_text ? workout.meta.workout_text : ""
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (title === workout.meta.title) return;
    dispatch(
      updateWorkout({
        workout_id: workout.meta.workout_id,
        token,
        workout_title: title,
      })
    );
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      {isEditing ? (
        <TextField
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          variant="outlined"
          size="small"
          sx={{
            textAlign: "center",
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          }}
        />
      ) : (
        <Typography
          variant="body1"
          onClick={handleEditClick}
          sx={{ cursor: "pointer", color: "primary.main" }}
        >
          {title}
        </Typography>
      )}
    </div>
  );
};

export default WorkoutTitle;
