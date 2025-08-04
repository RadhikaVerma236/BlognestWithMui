// src/components/HeroSection.tsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const blogSection = document.getElementById("blog-section");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        width: "100%", // full viewport width
    // marginLeft: "calc(-50vw + 50%)",
        position: "relative",
        height: { xs: "380px", sm: "420px", md: "500px" },
        backgroundColor: "#ECFDF5",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(45, 212, 191, 0.3) 10%, transparent 40%),
          radial-gradient(circle at 90% 30%, rgba(100, 116, 139, 0.15) 10%, transparent 50%),
          radial-gradient(circle at 50% 90%, rgba(148, 163, 184, 0.1) 10%, transparent 50%)
        `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // color: "#134E4A",
        px: 3,
      }}
    >
      {/* Overlay */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly more opacity
        }}
      /> */}

{/* Optional Floating Gradient Bubble */}
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          background: "linear-gradient(135deg, #2DD4BF, #14B8A6)",
          opacity: 0.2,
          borderRadius: "50%",
          top: -50,
          left: -50,
          animation: "float 6s ease-in-out infinite",
        }}
      />

      {/* Optional Secondary Bubble */}
      <Box
        sx={{
          position: "absolute",
          width: 150,
          height: 150,
          background: "#A5F3FC",
          opacity: 0.15,
          borderRadius: "50%",
          bottom: -40,
          right: -40,
          animation: "floatReverse 8s ease-in-out infinite",
        }}
      />


      {/* Text Content */}
      <Box sx={{ position: "relative", zIndex: 1, px: 2, maxWidth: 900 }}>
        {/* Headline */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            fontWeight: 800,
            mb: 2,
            lineHeight: 1.2,
            color: "#0F172A", // darker text for contrast
            textShadow: "1px 1px 2px rgba(255,255,255,0.4)",
          }}
        >
          A <span style={{ color: "#14B8A6" }}>Cozy Corner</span> of the Internet for You.
        </Typography>

        {/* Subtext */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: 400,
            mb: 3,
            color: "#1E293B",
            textShadow: "1px 1px 1px rgba(255,255,255,0.3)",
            px: { xs: 1, md: 4 },
          }}
        >
          Grab a tea, take a breath, and explore <strong>lifestyle stories</strong> that speak to the soul.
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#14B8A6",
            color: "#fff",
            px: 5,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "999px",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#0D9488",
            },
          }}
          onClick={handleExploreClick}
        >
          Explore Blogs
        </Button>
      </Box>

       {/* Floating Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes floatReverse {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;
