import React from "react";
import { Box } from "@mui/material";
import "./App.css";
import { NavBar } from "./components/index.js";
import { useTheme } from "@mui/material/styles";
import Home from "./components/Account/Home.js";

const App = () => {
  const theme = useTheme();

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
        <Home />
      </Box>
    </Box>
  );
};

export default App;
