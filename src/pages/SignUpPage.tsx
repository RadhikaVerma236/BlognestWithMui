import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button, TextField, Typography, Box, Container, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUpPage =()=>{
    const navigate = useNavigate();

    //form state values
    const [fullName, setFullName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Show or hide password toggle
    const [showPassword, setShowPassword]= useState(false);
    const [showConfirmPassword, setShowConfirmPassword]= useState(false);

    //Error State
    const [error, setError] = useState('');

    //hanndle form Submission
    const handleSubmit  = (e:React.FormEvent) =>{
        e.preventDefault();

        //Reset error first
        setError('');

        //Check if all fields are filled
        if(!fullName || !email || !password || !confirmPassword){
            setError('All fields are required');
    return;
        }

        //VALIDATE PASSWORD MATCH
        if(password !== confirmPassword){
            setError('Password do not match');
            return;
        }

        //create a user object
        const user = {fullName, email, password};

        //save user to localstorage (signup)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('theme','light');  //optional

        //Redirect to homepage 
        navigate('/');
    };

    return(
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>

                {/*Title*/}
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                    Sign Up
                </Typography>

                {/*Subtitle */}
                <Typography variant="body1" textAlign="center" mb={4}>
                    Create your Blognest account
                </Typography>

                {/* Signup Form */}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                   {/* Full Name */}
                   <TextField 
                   label="Full Name"
                   fullWidth
                   margin="normal"
                   required
                   value={fullName}
                   onChange={(e)=>setFullName(e.target.value)}
                />

                {/* Email */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

                   {/* Password*/}
                   <TextField 
                   label="Password"
                   type={showPassword ? 'text' : 'password'}
                   fullWidth
                   margin="normal"
                   required
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton 
                            onClick={()=> setShowPassword(!showPassword)}
                            edge="end"
                            aria-label="toggle password visibility"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                   }} 
                   />

                   {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>

          {/* Already have an account link */}
          <Button
            onClick={() => navigate('/login')}
            fullWidth
            sx={{ mt: 2 }}
          >
            Already have an account? Login
          </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUpPage