import React, { useState } from "react";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import RowingIcon from "@mui/icons-material/Rowing";
import { FitnessCenter as FitnessCenterIcon } from "@mui/icons-material";
const exerciseTypes = ["standard", "row"];

const Exercise = ({ addExercise, addRow }) => {
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [rowDistance, setRowDistance] = useState("");
  const [rowTime, setRowTime] = useState("");
  const [exerciseTypeIndex, setExerciseTypeIndex] = useState(0);

  const handleAddExercise = () => {
    switch (exerciseTypes[exerciseTypeIndex]) {
      case "standard":
        addExercise({ reps, sets, name, weight });
        break;
      case "row":
        console.log("adding row in switch,", rowDistance, rowTime);
        addRow({ rowDistance, rowTime });
        break;
      default:
        console.log(
          `handleAddExercise not handled ${exerciseTypes[exerciseTypeIndex]}`
        );
    }

    clearFields();
  };

  const clearFields = () => {
    setReps("");
    setSets("");
    setName("");
    setWeight("");
    setRowDistance("");
    setRowTime("");
  };

  const changeExerciseType = () => {
    if (exerciseTypeIndex + 1 === exerciseTypes.length) {
      setExerciseTypeIndex(0);
    } else {
      setExerciseTypeIndex(exerciseTypeIndex + 1);
    }
  };

  return (
    <Box>
      {exerciseTypes[exerciseTypeIndex] === "standard" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FitnessCenterIcon sx={{ paddingBottom: "16px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ width: "140px" }}
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <Typography
              sx={{ paddingLeft: "8px", paddingRight: "8px" }}
              variant="body1"
            >
              x
            </Typography>
            <TextField
              sx={{ width: "140px" }}
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ width: "140px" }}
              placeholder="Exercise"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography
              sx={{ paddingLeft: "8px", paddingRight: "8px" }}
              variant="body1"
            >
              @
            </Typography>
            <TextField
              sx={{ width: "140px" }}
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <RowingIcon sx={{ paddingBottom: "16px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ width: "140px" }}
              placeholder="Distance"
              value={rowDistance}
              onChange={(e) => setRowDistance(e.target.value)}
            />
            <Typography
              sx={{ paddingLeft: "8px", paddingRight: "8px" }}
              variant="body1"
            >
              @
            </Typography>
            <TextField
              sx={{ width: "140px" }}
              placeholder="Time"
              value={rowTime}
              onChange={(e) => setRowTime(e.target.value)}
            />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "8px",
        }}
      >
        <IconButton onClick={changeExerciseType}>
          <ChangeCircleIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handleAddExercise}>
          <ControlPointIcon color="text.secondary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Exercise;
