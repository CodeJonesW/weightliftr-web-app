import React, { useRef } from "react";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import AssessmentIcon from "@mui/icons-material/Assessment";

const FeaturesSection = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      sx={{
        padding: "80px 0",
        backgroundColor: theme.palette.background.default,
      }}
      id="features"
      ref={ref}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            color: theme.palette.text.primary,
          }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                  textAlign: "center",
                }}
              >
                <TrackChangesIcon
                  sx={{
                    fontSize: "48px",
                    color: theme.palette.secondary.main,
                    marginBottom: "16px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    marginBottom: "8px",
                  }}
                >
                  Weightlifting Notepad
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Record your workouts in a digital notepad. Use your own
                  format.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                  textAlign: "center",
                }}
              >
                <SubtitlesIcon
                  sx={{
                    fontSize: "48px",
                    color: theme.palette.secondary.main,
                    marginBottom: "16px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    marginBottom: "8px",
                  }}
                >
                  View stats
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  See progress over time with detailed statistics and graphs.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Paper
                elevation={6}
                sx={{
                  padding: "44px",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[4],
                  borderRadius: "10px",
                  minHeight: "144px",
                  textAlign: "center",
                }}
              >
                <AssessmentIcon
                  sx={{
                    fontSize: "48px",
                    color: theme.palette.secondary.main,
                    marginBottom: "16px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    marginBottom: "8px",
                  }}
                >
                  Get suggestions
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Get suggestions on how to modify your workouts incrementally.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
