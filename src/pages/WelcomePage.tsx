// src/pages/WelcomePage.tsx
import { Box, Button, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const WelcomePage=()=>{
    return(
        <Box sx={{
            bgcolor:'background.default',
            color:'text.primary',
            display:'flex',
            flexDirection:'column',
            overflow: "hidden", // Prevent accidental scroll
            pt: { xs: 8, sm: 10 }, // Top padding to clear the AppBar
        }}>
            
            {/* Main Content */}
            <Container
            maxWidth={false}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        //    mt: { xs: 4, sm: 6 }, // this helps if content is too short
          py: 8,
        }}>
                <Typography variant="h2" fontWeight="bold" mb={2}>
                    Welcome to Blognest
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={4}>
                    A place to share your thoughts, ideas, and stories with the world. Simple. Fast. Beautiful.
                </Typography>

                <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                    component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            size="large">
                        Get Started
                    </Button>
                    <Button
                    component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            size="large">
                Login
                </Button>
                </Box>
            </Container>
             {/* Footer */}
             {/* <Box component="footer" textAlign="center" py={2} bgcolor="surface.main">
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} BlogSphere. All rights reserved.
                </Typography>
             </Box> */}
        </Box>
    );
};

export default WelcomePage;