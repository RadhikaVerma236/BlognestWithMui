// layout/Footer.tsx
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        bgcolor: "surface.light",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; 2025 Blognest. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
