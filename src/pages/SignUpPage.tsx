// pages/Signup.tsx
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

const SignUpPage = () => {
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Error/Success state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Regex: Min 8 characters, at least 1 letter and 1 number
  const passwordIsStrong = (pass: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(pass);


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!passwordIsStrong(password)) {
      setError("Password must be at least 8 characters and include a letter and a number.");
      return;
    }

    // Check for existing users
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const emailExists = users.some((user: any) => user.email === email);
    if (emailExists) {
      setError("Email already exists. Try logging in.");
      return;
    }

    // Save user
    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Signup successful! Redirecting to login...");
    setError("");

    // Redirect after delay
    setTimeout(() => navigate("/login"), 500);
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
          Sign Up
        </Typography>

        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            type="password"
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirm((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </Button>
        </form>
        {/* Link to Login */}
<Typography variant="body2" align="center" sx={{ mt: 2 }}>
  Already have an account?{' '}
  <Link to="/login" style={{ color: '#14B8A6', textDecoration: 'none' }}>
    Log in here
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

export default SignUpPage;

