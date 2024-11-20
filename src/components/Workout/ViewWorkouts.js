import React, { useState } from "react";
import {
  Box,
  Card,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  ListItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";
import { setCurrentWorkout } from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ViewWorkouts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workouts } = useSelector((state) => state.profileSlice);
  console.log("workouts", workouts);
  const { token } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const handleShowGoal = async (workout_id) => {
    navigate(`/workout/${workout_id}`);
  };

  const handleDeleteGoal = async () => {
    if (!workoutToDelete) return;

    try {
      await fetch("/api/workout/deleteWorkout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workout_id: workoutToDelete,
        }),
      });
    } catch (error) {
      console.error("Failed to delete workout", error);
    }

    dispatch(getProfile({ token }));

    setOpen(false);
    setWorkoutToDelete(null);
  };

  const handleOpenDeleteDialog = (workout_id) => {
    setWorkoutToDelete(workout_id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setWorkoutToDelete(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  const isEditMenuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setShowDeleteButton(!showDeleteButton);
  };

  const handleShowWorkout = (workout_id) => {
    dispatch(setCurrentWorkout(workout_id));
    navigate(`/`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          padding: "24px",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box className="main">
          <Card
            style={{
              padding: "20px",
              borderRadius: "16px",
              maxWidth: "300px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant={"h6"}>Past Workouts</Typography>
              <Box>
                <IconButton
                  size="small"
                  id="basic-button"
                  aria-controls={isEditMenuOpen ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isEditMenuOpen ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={isEditMenuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                </Menu>
              </Box>
            </Box>

            <List>
              {workouts.length > 0 ? (
                workouts.map((workout, index) => (
                  <ListItem
                    onClick={() => handleShowWorkout(workout.workout_id)}
                    key={workout.workout_id}
                  >
                    <Typography>{workout.created_at}</Typography>
                  </ListItem>
                ))
              ) : (
                <p>No workouts saved</p>
              )}
            </List>
          </Card>

          <Dialog
            sx={{ borderRadius: "16px" }}
            open={open}
            onClose={handleCloseDialog}
          >
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this workout? This action cannot
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeleteGoal}
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ViewWorkouts;
