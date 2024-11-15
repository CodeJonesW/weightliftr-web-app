import React, { useState } from "react";
import axios from "axios";
import { validateEmail } from "../utils/account_verify";
import { Box, FormGroup, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const BackButton = () => {
    return (
      <Box style={{ width: "100%", marginBottom: "44px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/welcome")}
          style={{
            width: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="secondary-button"
        >
          <ArrowBackIosNewIcon />
        </Button>
      </Box>
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post(`/api/account/register`, {
        email: email,
        password,
      });
      setLoading(false);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      const error = err.response.data.error;
      console.log("my err", error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ padding: "24px" }}>
        <BackButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "300px",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", color: theme.palette.text.primary }}
          >
            Register
          </Typography>
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "20px" }}
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleRegister}>
            <FormGroup>
              <Box className="input-group">
                <TextField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <Box className="input-group">
                <TextField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
                      WebkitTextFillColor: theme.palette.text.primary,
                    },
                  }}
                />
              </Box>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
