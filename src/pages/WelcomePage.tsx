// src/pages/WelcomePage.tsx
import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const WelcomePage=()=>{
    
    return(
         <Box
      sx={{
        minHeight: "100vh", // Full screen height
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      {/* HEADLINE */}
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: {
            xs: "2.25rem", // mobile
            sm: "3rem",
            md: "3.75rem",
          },
        }}
      >
        Welcome to Blognest
      </Typography>

      {/* SUBTEXT */}
      <Typography
        variant="h6"
        color="text.secondary"
        mb={4}
        sx={{
          maxWidth: 600,
        }}
      >
        Share your thoughts, ideas, and stories with the world — beautifully and effortlessly.
      </Typography>

      {/* ACTION BUTTONS */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
          size="large"
        >
          Get Started
        </Button>

        <Button
          component={Link}
          to="/Login"
          variant="outlined"
          color="primary"
          size="large"
        >
          Login
        </Button>
      </Box>
    </Box>
    );
};

export default WelcomePage;