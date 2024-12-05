import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ELRDisplay = ({ elr, maxElr }) => {
  const theme = useTheme(); // Access the MUI theme

  // Limit the ELR value between 0 and maxElr
  const normalizedElr = Math.min(Math.max(elr, 0), maxElr);

  // Calculate the percentage of the arch to fill
  const percentage = (normalizedElr / maxElr) * 100;

  // Calculate the angle of the filled portion in degrees (0 to 180 for a half-circle)
  const angle = (percentage / 100) * 180;

  // SVG dimensions
  const radius = 100; // Radius of the half-circle
  const strokeWidth = 20; // Width of the arch stroke
  const center = radius + strokeWidth / 2;

  // Calculate the end point of the arc using trigonometry
  const x = center + radius * Math.cos((Math.PI / 180) * (180 - angle));
  const y = center - radius * Math.sin((Math.PI / 180) * (180 - angle));

  // Create the arc path
  const arcPath = `
      M ${center - radius}, ${center} 
      A ${radius}, ${radius} 0 ${angle > 90 ? 1 : 0}, 1 ${x}, ${y}
    `;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ textAlign: "center", margin: theme.spacing(3) }}
    >
      <svg
        width={radius * 2 + strokeWidth}
        height={radius + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
      >
        {/* Background Arch */}
        <path
          d={`M ${center - radius}, ${center} A ${radius}, ${radius} 0 1, 1 ${
            center + radius
          }, ${center}`}
          stroke={theme.palette.grey[300]} // Use theme's gray for background
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Filled Arch */}
        <path
          d={arcPath}
          stroke={theme.palette.primary.main} // Use theme's primary color
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          marginTop: `${radius / 2}px`,
          color: theme.palette.text.primary, // Use theme's text color
        }}
      >
        {normalizedElr.toFixed(0)}
      </Typography>
    </Box>
  );
};

export default ELRDisplay;
