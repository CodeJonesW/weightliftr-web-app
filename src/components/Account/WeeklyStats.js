import { Box, Typography, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const WeeklyStats = () => {
  const theme = useTheme();
  const [totalWeightMoved, setTotalWeightMoved] = useState("");
  const { token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      const result = await axios.get("/api/account/weeklyStats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      setTotalWeightMoved(result.data.total_weight_moved);
    };

    fetchWeeklyStats();
  }, [token]);

  return (
    <Box sx={{ padding: "64px" }}>
      <Card
        style={{
          padding: "20px",
          borderRadius: "16px",
          maxWidth: "300px",
          height: "200px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6">Weekly Stats</Typography>
        <Box sx={{ paddingTop: "16px" }}>
          <Typography>Total Weight Moved: {totalWeightMoved}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default WeeklyStats;
