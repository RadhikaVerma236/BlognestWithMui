// pages/Login.tsx
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error and success
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((user: any) => user.email === email);

    if (!user) {
      setError("User not found. Please sign up first.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password.");
      return;
    }

    // Store login state
    localStorage.setItem("user", JSON.stringify(user));  //"user"
    setSuccess("Login successful!");
    setError("");

    setTimeout(() => navigate("/home"), 500);
  };

  return (
    <Container maxWidth="sm"
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }}>
      <Box p={4} bgcolor="surface.light" borderRadius={2} boxShadow={2} width="100%">
        <Typography variant="h4" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Log In
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
  Don’t have an account?{' '}
  <Link to="/signup" style={{ color: '#14B8A6', textDecoration: 'none' }}>
    Sign up here
  </Link>
</Typography>
<Typography variant="body2" align="center" sx={{ mt: 1 }}>
      <Link to="/" style={{ color: "#14B8A6", textDecoration: "none" }}>
        ← Back to Welcome
      </Link>
    </Typography>
      </Box>
    </Container>
  );
};

export default Login;
