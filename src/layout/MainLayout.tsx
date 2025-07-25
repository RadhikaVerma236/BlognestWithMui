import { useContext, useState } from "react"
import { ColorModeContext } from "../theme"
import { Box, AppBar, Toolbar, Typography, Button, Avatar, MenuItem, IconButton, Menu } from "@mui/material";
import { Outlet,useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import {Brightness4, Brightness7} from '@mui/icons-material';

// src/layout/MainLayout.tsx
const MainLayout=()=>{
    const colorMode = useContext(ColorModeContext);
    const themeMode = localStorage.getItem('theme') || 'light';
    const navigate= useNavigate();

    const user=JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn=!!user;

    const [anchorEl, setAnchorEl]= useState<null | HTMLElement>(null);
    const open=Boolean(anchorEl);

    const handleAvatarClick= (event: React.MouseEvent<HTMLElement>)=>{
        setAnchorEl(event.currentTarget);
    };

    const handleClose=()=>{
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();  //refresh to update ui
    };

    const getInitials=(name:String)=>{
        const[first, last]= name.split(' ');
        return `${first[0] || ''}${last?.[0] || ''}`.toUpperCase();
    };

    return(
        <Box sx={{display:'flex', flexDirection:'column', minHeight:'100vh',  overflowX: 'hidden'}}>
            {/*Navbar*/}
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h4" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        Blognest
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Conditional nav items */}
                        {!isLoggedIn ?(
                            <>
                            <Button onClick={()=>navigate('/login')}>Login</Button>
                            <Button onClick={() => navigate('/signup')} variant="outlined">Sign Up</Button>
                            </>
                        ) : (
                            <>
                            <Button onClick={() => navigate('/write')}>Write Blog</Button>
                            <Avatar  sx={{ bgcolor: deepPurple[500], cursor: 'pointer' }}
                  onClick={handleAvatarClick}>
                                {getInitials(user.fullName)}
                            </Avatar>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem>Logout</MenuItem>
                            </Menu>
                            </>
                        )}

                        {/* Dark Mode Toggle */}
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

           {/* Page Content */}
           <Box component="main" sx={{ flexGrow: 1, px: 3, display: 'flex', flexDirection: 'column' }}>
            <Outlet />
           </Box> 

            {/* Footer */}
            <Box component="footer" sx={{ textAlign: 'center', py: 2, bgcolor: 'surface.light', mt: 'auto' }}>
                <Typography variant="body2" color="text.secondary">
                    &copy; 2025 Blognest. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default MainLayout;