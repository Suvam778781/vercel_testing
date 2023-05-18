import React, { useState } from 'react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { register } from '@/utils/redux-arch/authreducer/action';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const store = useSelector((store) => store.authreducer);
  const dispatch = useDispatch();

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password, firstname, lastname }));
  };

  const validateForm = () =>
    firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0;

  return (
    <Box sx={{ margin: 'auto', marginTop: '140px', maxWidth: 400, margin: 'auto', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', borderRadius: 8, padding: 4 }}>
      <Typography variant="h4" align="center" mb={4}>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField id="first-name" label="First Name" type="text" value={firstname} onChange={handleFirstnameChange} required />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField id="last-name" label="Last Name" type="text" value={lastname} onChange={handleLastnameChange} required />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField id="email" label="Email" type="email" value={email} onChange={handleEmailChange} required />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField id="password" label="Password" type="password" value={password} onChange={handlePasswordChange} required />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!validateForm()}>
          Sign Up
        </Button>
      </form>
      <Box height="50px" p="3" margin="auto" marginTop="20px">
        Have an account?{' '}
        <Link href="/routes/login" passHref>
          <a style={{ textDecoration: 'none', color: '#00d5fa', fontWeight: '700', padding: '2 3 4 5' }}>Login</a>
        </Link>
      </Box>
      </Box>)
};

export default Register;