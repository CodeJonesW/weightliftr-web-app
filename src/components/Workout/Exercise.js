import React, { useState } from "react";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Exercise = ({ addExercise }) => {
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  const handleAddExercise = () => {
    addExercise({ reps, sets, name, weight });
    clearFields();
  };

  const clearFields = () => {
    setReps("");
    setSets("");
    setName("");
    setWeight("");
  };

  return (
    <Box>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "8px",
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
