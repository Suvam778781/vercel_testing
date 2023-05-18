"client side"
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { padding } from '@mui/system';
import { login } from '@/utils/redux-arch/authreducer/action';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const router=useRouter();
  const dispatch=useDispatch()
  const store=useSelector(store=>store.authreducer)
  console.log(store)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //login logic here 
dispatch(login({email,password,userType}))    
  };
  const validateForm = () => {
    return email.length > 0 && password.length > 0 && userType !== '';
  };


  if (typeof window !== 'undefined') {
    const userDetails = JSON.parse(localStorage.getItem('details'));
  
    if (userDetails && (userDetails.role === 'user' || userDetails.role === 'client')) {
      router.push('/?page=1&limit=10');
    }
  }
  return (
    <Box 
      sx={{ 
        margin:"auto",
        maxWidth: 400,
        marginTop:"140px",
        margin: 'auto',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        padding: 4,         
    }}
    >
      <Typography variant="h4" align="center" mb={4}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-type-label">User Type</InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type"
            value={userType}
            onChange={handleUserTypeChange}
            required
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <FormHelperText>Select your user type</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
        >
          Log In
        </Button>
      </form>
      <Box height= "50px" p="3" margin={"auto"} marginTop={"20px"}>
  Dont have account ? 
     <Link style={{textDecoration:"none",color:"#00d5fa",fontWeight:"700",padding:"2 3 4 5"}} href='/routes/register'>Signup</Link>
     </Box>
    </Box>
  );
};
export default Login;
