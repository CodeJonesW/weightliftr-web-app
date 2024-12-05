import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ELRDisplay = ({ elr, maxElr }) => {
  const theme = useTheme();

  // Limit the ELR value between 0 and maxElr
  const normalizedElr = Math.min(Math.max(elr, 0), maxElr);

  // State to control the current displayed value during the animation
  const [currentElr, setCurrentElr] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // Animation duration in milliseconds
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1); // Calculate progress
      setCurrentElr(Math.floor(progress * normalizedElr));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [normalizedElr]);

  // Calculate the percentage and angle based on the animated ELR value
  const percentage = (currentElr / maxElr) * 100;
  const angle = (percentage / 100) * 180;

  // SVG dimensions
  const radius = 80; // Radius of the half-circle
  const strokeWidth = 16; // Width of the arch stroke
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
      sx={{
        textAlign: "center",
        margin: theme.spacing(3),
        position: "relative",
      }}
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
          strokeLinecap="round" // Ensure rounded ends for the background arch
        />
        {/* Animated Filled Arch */}
        <path
          d={arcPath}
          stroke={theme.palette.primary.main} // Use theme's primary color
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round" // Ensure rounded ends for the filled arch
        />
      </svg>

      <Typography
        variant="h6"
        sx={{
          position: "relative", // Position relative to the parent box
          marginTop: `-${radius / 2}px`, // Adjust to center the text within the arch
          color: theme.palette.text.primary, // Use theme's text color
        }}
      >
        {currentElr}
      </Typography>
    </Box>
  );
};

export default ELRDisplay;
