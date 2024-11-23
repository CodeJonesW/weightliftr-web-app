import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
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
} from "@mui/material";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/slices/profileSlice";
import {
  setCurrentWorkout,
  deleteWorkout,
} from "../../redux/slices/workoutSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewWorkouts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { workouts } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.authSlice);

  const [open, setOpen] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  const handleDeleteWorkout = async () => {
    if (!workoutToDelete) return;

    try {
      dispatch(deleteWorkout({ token, workout_id: workoutToDelete }));
      dispatch(getProfile({ token }));
    } catch (error) {
      console.error("Failed to delete workout", error);
    }
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
    localStorage.setItem("workout_id", workout_id);
    dispatch(setCurrentWorkout(workout_id));
    navigate(`/`);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        className="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "scroll",
          background: theme.palette.background.default,
        }}
      >
        <Box style={{ width: "100%", paddingBottom: "24px" }}>
          <NavBar />
        </Box>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{ width: "100%", height: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: "24px",
            }}
          >
            <Typography color="text.secondary" variant={"h6"}>
              Past Workouts
            </Typography>
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
          <Box>
            {workouts.length > 0
              ? workouts.map(
                  (workout, index) => (
                    console.log(workout),
                    (
                      <Card
                        key={workout.workout_id}
                        style={{
                          padding: "20px",
                          borderRadius: "16px",
                          maxWidth: "300px",
                          height: "200px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <ArrowCircleRightIcon
                            onClick={() =>
                              handleShowWorkout(workout.workout_id)
                            }
                          />
                        </Box>
                        <Box>
                          <Typography>{workout.workout_text}</Typography>
                          <Typography>{workout.created_at}</Typography>
                        </Box>

                        {showDeleteButton ? (
                          <IconButton>
                            <DeleteIcon
                              onClick={() =>
                                handleOpenDeleteDialog(workout.workout_id)
                              }
                            />
                          </IconButton>
                        ) : null}
                      </Card>
                    )
                  )
                )
              : null}
          </Box>

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
                onClick={handleDeleteWorkout}
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ViewWorkouts;
