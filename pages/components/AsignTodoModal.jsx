import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { blue } from "@mui/material/colors";
import { assignTodoToUser } from "@/utils/redux-arch/userreducer/action";
const AssignTodoModal = ({ asignModal, firstname, handleAsignModalClose, email }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const dispatch=useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deadline") {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) {
        return; // Ignore the change if the selected date is before today
      }
    }

    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or save task data
    console.log(taskData);
    dispatch(assignTodoToUser(email,taskData))
    handleAsignModalClose();
  };
  return (
    <Modal open={true} onClose={handleAsignModalClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "80%",
            maxWidth: 500,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: 8,
            padding: 4,
            position: "relative",
          }}
        >
          <Typography variant="h5" align="center" mt={2} mb={4}>
            Assign Task <span style={{color:blue}}>{firstname}</span>
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="title"
                label="title"
                type="title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                name="description"
                value={taskData.description}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="deadline"
                label="Deadline"
                type="date"
                name="deadline"
                value={taskData.deadline}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </FormControl>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
              }}
            >
              <Button onClick={handleAsignModalClose} mr={2}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Task
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignTodoModal;
