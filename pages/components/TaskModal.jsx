import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

const TaskModal = ({ addTask, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStatus(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
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
        zIndex: addTask ? 1 : -1,
        opacity: addTask ? 1 : 0,
        pointerEvents: addTask ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}
      onClick={handleClose}
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
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Add Task</Typography>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="title">Title</InputLabel>
            <TextField
              id="title"
              name="title"
              variant="outlined"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextareaAutosize
              id="description"
              name="description"
              rowsMin={3}
              rowsMax={10}
              variant="outlined"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              id="status"
              name="status"
              variant="outlined"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={0}>Incomplete</MenuItem>
              <MenuItem value={1}>Complete</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add Task
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default TaskModal;
