import { Box, Typography, Card, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ELRDisplay from "./WeeklyStats/ELRDisplay";

const WeeklyStats = () => {
  const theme = useTheme();
  const [totalWeightMoved, setTotalWeightMoved] = useState("");
  const [totalReps, setTotalReps] = useState("");
  const [totalSets, setTotalSets] = useState("");
  const [elr, setElr] = useState("");
  const { token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      const result = await axios.get("/api/account/weeklyStats", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("weekly stats", result);
      setTotalWeightMoved(result.data.total_weight_moved);
      setTotalReps(result.data.total_reps);
      setTotalSets(result.data.total_sets);
      setElr(result.data.elr);
    };

    fetchWeeklyStats();
  }, [token]);

  return (
    <Box sx={{ padding: "24px" }}>
      <Card
        style={{
          padding: "20px",
          borderRadius: "16px",
          width: "300px",
          height: "auto",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <AnalyticsIcon sx={{ paddingRight: "8px" }} />
          <Typography variant="h6">Weekly Stats</Typography>
        </Box>

        <Box sx={{ paddingTop: "16px" }}>
          <Typography variant="body1">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {totalWeightMoved} lbs
            </Typography>
            have moved this week.
          </Typography>
          <Typography variant="body1">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {totalSets}
            </Typography>
            total sets this week.
          </Typography>
          <Typography variant="body1">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {totalReps}
            </Typography>
            total reps this week.
          </Typography>
        </Box>
        <Divider sx={{ paddingTop: "16px" }} />
        <Box sx={{ paddingTop: "16px" }}>
          <Typography variant="body1">Effort Load Ratio</Typography>
          <ELRDisplay elr={elr} maxElr={1000} />
        </Box>
      </Card>
    </Box>
  );
};

export default WeeklyStats;
