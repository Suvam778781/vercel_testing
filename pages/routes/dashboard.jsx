import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";

import UserDataTable from "../components/UserDataTable";
import Sidebar from "../components/SideBar";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { fetchUsers } from "@/utils/redux-arch/userreducer/action";
const Dashboard = () => {
  const [state, setstate] = useState(1);
  const auth = useSelector((store) => store.authreducer);
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.userreducer);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (auth.user) {
      setUserRole(`${auth.user.role}`);
    } else {
      setUserRole("");
    }
  }, [auth.user]);

  const handleChange = (v) => {
    setstate(v);
  };

  if(auth.user&&auth.user.role!=="client"){

    router.push("/routes/login")

  }

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          marginTop: "5px",
        }}
      >
        <Sidebar state={state} setstate={setstate} />
        <Box sx={{ flexGrow: 1 }}>
          {state == 2 ? (
            <AddUserForm handleChange={handleChange} />
          ) : (
            <UserDataTable handleChange={handleChange} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
