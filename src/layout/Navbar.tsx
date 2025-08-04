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
  useTheme,
 } from "@mui/material";
import {  Brightness4, Brightness7 } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme";


const Navbar = () => {
  const navigate = useNavigate();
  const theme=useTheme();
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
    <AppBar position="sticky" color="default" elevation={2} sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}>
      <Toolbar sx={{ justifyContent: "space-between",
         minHeight: { xs: 64, sm: 72 },
         py: { xs: 2, sm: 2.5 },
         px: { xs: 2, sm: 3 }, 
      }}>
        {/* Blog Title */}
        <Typography
          variant="h5"
          // color="primary"
          sx={{ cursor: "pointer", fontWeight: 700, fontSize: { xs: "1.5rem", sm: "2rem" },
          letterSpacing: "0.5px",
            background: "linear-gradient(to right, #14B8A6, #2DD4BF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", }}
          onClick={() => navigate("/")}
        >
          Blognest
        </Typography>

         
        {/* Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Conditional Buttons */}
          {!isLoggedIn ? (
            <>
              <Button variant="text" onClick={() => navigate("/login")} sx={{ fontWeight: 500, color: "text.primary" }}>Login</Button>
              <Button variant="outlined" onClick={() => navigate("/signup")} sx={{
                  borderRadius: 2,
                  borderColor: "#14B8A6",
                  color: "#14B8A6",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#ECFDF5",
                    borderColor: "#14B8A6",
                  },
                }}>
                Sign Up
              </Button>
            </>
          ) : (
            //Loggedin show write and avatar menu
            <>
              <Button onClick={() => navigate("/home/write")} sx={{
                 px: 3, // padding left/right
                py: 1.2, // padding top/bottom
                fontSize: "1rem",
                  fontWeight: 500,
                  backgroundColor:"#14B8A6",
                  textTransform: "none",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0D9488",
                  },
                }}>Write Blog</Button>
              <Avatar
                sx={{
                  bgcolor: "primary.main", // ✅ Uses theme primary color
                  color: "#fff",           // ✅ White initials for contrast
                  cursor: "pointer",
                  width: 42,
                  height: 42,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {getInitials(user.fullName)}
              </Avatar>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.5,
                    minWidth: 160,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    border:
                      theme.palette.mode === "light"
                        ? "1px solid #D1FAE5"
                        : "1px solid #334155",
                    boxShadow:
                      "0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
                  },
                }}>
                <MenuItem onClick={() => {navigate("/home/profile")
                  setAnchorEl(null);
                  (document.activeElement as HTMLElement)?.blur();
                }} sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#ECFDF5",
                      color: "#14B8A6",
                    },
                  }}>Profie</MenuItem>
                <MenuItem onClick={handleLogout}  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#ECFDF5",
                      color: "#14B8A6",
                    },
                  }}>Logout</MenuItem>  
              </Menu>
            </>
          )}

          {/* Dark Mode Toggle */}
          <IconButton onClick={colorMode.toggleColorMode} sx={{
              color: themeMode === "dark" ? "#D1FAE5" : "#14B8A6",
              ml: 1,
               p: 1.2,
              transition: "0.3s",
              "&:hover": {
                color: themeMode === "dark" ? "#A7F3D0" : "#0F766E",
              },
            }}>
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
         
      </Toolbar>
    </AppBar>

    
  );
};

export default Navbar;
