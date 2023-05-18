import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  FormControl,
  TextField,
  
  Modal,
} from "@mui/material";
import { updateUser } from "@/utils/redux-arch/userreducer/action";
import { Edit, Delete, Assignment } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AssignTodoModal from "./AsignTodoModal";
import { deleteUser, fetchUsers } from "@/utils/redux-arch/userreducer/action";
// import UpdateModal from "../components/UpdateModal";

const UserDataTable = () => {
  const [editModal,setEditModal]=useState(false)
  const [asignModal,setAsignModal]=useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.userreducer);
  console.log(user)
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAsignModalClose=()=>{
    setAsignModal(false)
  }
  const handleAsignModalOpen=()=>{
    setAsignModal(true)
  }
const handleUpdate=(data)=>{
}

const handleEditModal=()=>{
setEditModal(true)  
}

const handleCloseEditModal=()=>{

  setEditModal(false)

}
const handleDelete=(id)=>{
dispatch(deleteUser(id))
}
  return (
    <Box sx={{ height: "85vh", overflowY: "auto" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontFamily: "inherit", margin: "2vh" }}
      >
        USER DATA
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={handleEditModal} style={{width:"50px"}}>
                    <Edit />
                  </IconButton>
                  <UpdateModal handleUpdate={handleUpdate} editModal={editModal} setEditModal={setEditModal} handleCloseEditModal={handleCloseEditModal} handleEditModal={handleEditModal} user={user}/>
                  {user.id!==1&&<IconButton  style={{width:"50px"}} aria-label="delete" onClick={()=>handleDelete(user.id)}>
                    <Delete />
                  </IconButton>}
                  <Button variant="contained" onClick={handleAsignModalOpen} startIcon={<Assignment />}>
                    Assign
                  </Button>
                  {asignModal&&<AssignTodoModal firstname={user.firstname} lastname={user.lastname} email={user.email} asignModal={asignModal} handleAsignModalClose={handleAsignModalClose}/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};





const UpdateModal = ({
  editModal,
  user,
  handleCloseEditModal,
}) => {
  const [editedUser, setEditedUser] = useState(user);
console.log(editedUser)
  const dispatch=useDispatch()
  const handleClose = () => {
    handleCloseEditModal();
  };

  const handleEditUser = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or update user data
    console.log(editedUser);
    dispatch(updateUser(user.id,editedUser))
    handleCloseEditModal();
  };
  return (
    <Modal
      open={editModal}
      onClose={handleClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          width: "80%",
          maxWidth: 500,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: 8,
          padding: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" id="edit-modal-title">
            Edit User
          </Typography>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="firstname"
              label="First Name"
              type="text"
              // value={editedUser.firstname}
              onChange={handleEditUser}
              name="firstname"
              sx={{ backgroundColor: "#FFFFFF" }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="lastname"
              label="Last Name"
              type="text"
              name="lastname"
              // value={editedUser.lastname}
              onChange={handleEditUser}
              sx={{ backgroundColor: "#FFFFFF" }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
               InputProps={{ readOnly: true }}
              id="email"
              label="Email"
              name="email"
              type="email"
              
              value={editedUser.email}
              onChange={handleEditUser}
              sx={{ backgroundColor: "#FFFFFF" }}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
                 InputProps={{ readOnly: true }}
              id="password"
              label="Password"
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleEditUser}
              sx={{ backgroundColor: "#FFFFFF" }}
              required
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Edit User
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default UserDataTable;
