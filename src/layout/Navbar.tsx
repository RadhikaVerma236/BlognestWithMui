// layout/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme";
import { deepPurple } from "@mui/material/colors";

const Navbar = () => {
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const themeMode = localStorage.getItem("theme") || "light";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get user from localStorage
  let user = null;
  try {
    const stored = localStorage.getItem("user");  //("user")
    user = stored ? JSON.parse(stored) : null;
  } catch (e) {
    user = null;
  }

  const isLoggedIn = !!(user && user.email && user.fullName);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//     window.location.reload();
//   };

const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name: string = "") => {
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Blog Title */}
        <Typography
          variant="h4"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Blognest
        </Typography>

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Conditional Buttons */}
          {!isLoggedIn ? (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button variant="outlined" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/home/write")}>Write Blog</Button>
              <Avatar
                sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {getInitials(user.fullName)}
              </Avatar>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={() => navigate("/home/profile")}>Profie</MenuItem>
              </Menu>
            </>
          )}

          {/* Dark Mode Toggle */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
