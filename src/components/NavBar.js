import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { FitnessCenter as FitnessCenterIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { clearAuthToken } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";

const NavBar = ({ isMenuDisabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useSelector((state) => state.authSlice);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearAuthToken());
    navigate("/welcome");
  };

  const handleNavigateToGoals = () => {
    navigate("/workouts");
  };

  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.background.paper }}
      position="static"
    >
      {isMenuDisabled ? (
        <Toolbar>
          <ListAltIcon sx={{ marginRight: "8px" }} />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: theme.palette.text.primary }}
          >
            Weightliftr
          </Typography>
        </Toolbar>
      ) : (
        <Toolbar>
          <FitnessCenterIcon sx={{ marginRight: "8px" }} />
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            sx={{ flexGrow: 1, color: theme.palette.text.primary }}
          >
            Weightliftr
          </Typography>

          <Box>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate("/")}>Create Workout</MenuItem>
              <MenuItem onClick={handleNavigateToGoals}>Past Workouts</MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>
                View Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default NavBar;