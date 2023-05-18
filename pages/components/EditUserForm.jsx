import React, { useState } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

const EditUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FirstName:", firstName);
    console.log("LastName:", lastName);

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "2vh",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
        padding: 4,
        backgroundColor: "#ccf7fe",
      }}
    >
      <Typography variant="h4" align="center" mb={4}>
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            sx={{ backgroundColor: "#FFFFFF" }}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            sx={{ backgroundColor: "#FFFFFF" }}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ backgroundColor: "#FFFFFF" }}
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
            sx={{ backgroundColor: "#FFFFFF" }}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditUserForm;
