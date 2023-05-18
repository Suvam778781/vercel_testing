import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const UserEmailModal = ({open,setOpen,userEmail,setUserEmail,handleAssignTodo}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };


  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, width: 300 }}>
          <TextField
            label="Email"
            
            style={{backgroundColor:"white"}}
            value={userEmail}
            onChange={handleEmailChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAssignTodo} fullWidth>
            Asign
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserEmailModal;
