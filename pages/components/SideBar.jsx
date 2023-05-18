import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { AddIcCall, Home, Person2, Settings, TableChart } from "@mui/icons-material";

const Sidebar = ({setstate,state}) => {
  return (
    <Box sx={{ width: "240px", backgroundColor: "#00d5fa", height: "86vh" }}>
      <Typography
        variant="h2"
        sx={{
          margin: "1rem",
        }}
      >
        Admin Dashboard
      </Typography>
      <List typography="body1">
        <ListItem>
          <ListItemIcon>
            <TableChart/>
          </ListItemIcon>
          <ListItemText onClick={()=>{setstate(1)}} primary="User Table" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
          <Person2/>
          </ListItemIcon>
          <ListItemText onClick={()=>{setstate(2)}}  primary="Add User" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
