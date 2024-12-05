import { createTheme } from "@mui/material/styles";

export const themeConfig = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4a62ed", // Vibrant Blue
      contrastText: "#FFFFFF", // Text on Primary
    },
    secondary: {
      main: "#E0E0E0", // Light Gray
      contrastText: "#000000", // Text on Secondary
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1E1E1E", // Surface color
    },
    text: {
      primary: "#E0E0E0", // Light Gray
      secondary: "#B0B0B0", // Mid Gray
      disabled: "#8A8A8A", // Dim Gray
    },
    error: {
      main: "#CF6679", // Soft Red
      contrastText: "#000000", // Text on Error
    },
    divider: "#373737", // Divider color
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.05)", // Example shadows with elevation overlay
    "0px 1px 2px rgba(0, 0, 0, 0.07)",
    // ... Add higher levels of elevation
  ],
});
