import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Assignment, Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";
import { addTodo, assignTodoToUser, deleteTodo, fetchTodos, updateTodo } from "@/utils/redux-arch/todoreducer/action";
import UserEmailModal from "./components/UserEmailModal";

const Home = () => {
  const [open, setOpen] = useState(false); // State to control the visibility of the email modal
  const [userEmail, setUserEmail] = useState(""); // State to hold the user email entered in the email modal
  const [title, setTitle] = useState(""); // State to hold the title of a todo
  const [description, setDescription] = useState(""); // State to hold the description of a todo
  const [status, setStatus] = useState(""); // State to hold the status of a todo
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control the visibility of the add todo modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control the visibility of the edit todo modal
  const [editTodoId, setEditTodoId] = useState(null); // State to hold the ID of the todo being edited
  const [page, setPage] = useState(1); // State to keep track of the current page for pagination
  const todo = useSelector((store) => store.todoreducer); // Selecting the todo state from the Redux store
  const auth = useSelector((store) => store.authreducer); // Selecting the authentication state from the Redux store
  const router = useRouter(); // Accessing the router object
  const dispatch = useDispatch(); // Creating a dispatch function for Redux actions
  useEffect(() => {
    dispatch(fetchTodos(page)); // Fetching todos when the page changes
  }, [page]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Updating the title state when the input value changes
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Updating the description state when the input value changes
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Updating the status state when the select value changes
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true); // Opening the add todo modal
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Closing the add todo modal
    setTitle(""); // Resetting the title state
    setDescription(""); // Resetting the description state
    setStatus(""); // Resetting the status state
  };

  const handleOpenEditModal = (todo) => {
    setEditTodoId(todo.id); // Setting the ID of the todo being edited
    setTitle(todo.title); // Setting the title state with the current todo's title
    setDescription(todo.description); // Setting the description state with the current todo's description
    setStatus(todo.status); // Setting thestatus state with the current todo's status
    setIsEditModalOpen(true); // Opening the edit todo modal
  };

  const handleCloseEditModal = () => {
    setEditTodoId(null); // Resetting the editTodoId state
    setTitle(""); // Resetting the title state
    setDescription(""); // Resetting the description state
    setStatus(""); // Resetting the status state
    setIsEditModalOpen(false); // Closing the edit todo modal
  };

  const handleUpdateTodo = () => {
    const updatedTodo = {
      id: editTodoId,
      title,
      description,
      status,
    };
    dispatch(updateTodo(updatedTodo.id, updatedTodo)); // Dispatching the updateTodo action with the updated todo
    handleCloseEditModal(); // Closing the edit todo modal
  };

  const handleAssignTodo = (id) => {
    dispatch(assignTodoToUser(id, userEmail)); // Dispatching the assignTodoToUser action with the todo ID and the user email
    setOpen(false); // Closing the email modal
    console.log(id, userEmail);
  };

  const createTodo = () => {
    const newTodo = {
      title,
      description,
      status,
    };
    dispatch(addTodo(newTodo)); // Dispatching the addTodo action with the new todo
    handleCloseAddModal(); // Closing the add todo modal
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id)); // Dispatching the deleteTodo action with the todo ID
  };

  if (auth.user) {
    if (auth.user.role === "!user") {
      router.push("/routes/login"); // Redirecting to the login route if the user role is not authorized
    }
  }

  return (
    <Box>
      <Navbar /> {/* Rendering the Navbar component */}
      <Box
        maxWidth={800}
        margin="auto"
        marginTop={"140px"}
        p={4}
        border="2px solid"
        borderColor="#00d5fa"
        borderRadius={"7px"}
      >
        <Typography variant="h4" align="center" mb={4}>
          Todo List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.loading ? (
                <Box
                  width="100%"
                  height="100vh"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress size={120} />
                </Box>
              ) : (
                todo.todos.map((todo, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>
                      {todo.status === 0 ? "Pending" : "Completed"}
                    </TableCell>
                    <TableCell width={"40%"} align="center">
                      <Box display="flex" justifyContent="space-between">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleOpenEditModal(todo)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <Delete />
                        </IconButton>

                        {auth.user && auth.user.role == "user" ? (
                          <Button
                            variant="contained"
                            startIcon={<Assignment />}
                            onClick={() => setOpen(true)}
                          >
                            Assign
                          </Button>
                        ) : (
                          ""
                        )}

                        {/* Render the EmailModal component */}
                        <UserEmailModal
                          open={open}
                          setOpen={setOpen}
                          handleAssignTodo={() => handleAssignTodo(todo.id)}
                          userEmail={userEmail}
                          setUserEmail={setUserEmail}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          onClick={handleOpenAddModal}
        >
          Add Todo
        </Button>

        {/* Add Todo Modal */}
        <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Title"
                value={title}
                onChange={handleTitleChange}
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Description"
                value={description}
                required={true}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                required={true}
                onChange={handleStatusChange}
              >
                <MenuItem value="1">Completed</MenuItem>
                <MenuItem value="0">Pending</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancel</Button>
            <Button onClick={createTodo} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Todo Modal */}
        <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Title"
                value={title}
                onChange={handleTitleChange}
                required={true}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Description"
                value={description}
                required={true}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                required={true}
                onChange={handleStatusChange}
              >
                <MenuItem value="1">Completed</MenuItem>
                <MenuItem value="0">Pending</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
            <Button
              onClick={handleUpdateTodo}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box
        justifyContent={"space-between"}
        width={"200px"}
        margin={"auto"}
        display={"flex"}
        marginTop="50px"
      >
        <Button
          variant="contained"
          color="primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={page === 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
export default Home;
