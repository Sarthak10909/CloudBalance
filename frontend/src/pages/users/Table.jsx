import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pencil } from "lucide-react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function UsersTable() {

  // useEffect(() => {
  //   axios.get("http://localhost:8080/dashboard/users")
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/dashboard/users", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        setUsers(res.data);
      } catch (err) {
        console.log(err.getMessage);
      }
    };
    getUsers();
  }, [])

  const navigate = useNavigate();

  const handleEdit = (user) => {
    navigate("/dashboard/users/editUsers", {
      state: { userId: user.id }
    });
    console.log(user);
  }

  
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }}>

        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#dbeafe",
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
              }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {/* <Link to = "/dashbooard/users/editUser"> */}
                <Pencil onClick={() => {
                  handleEdit(user)
                }}

                  size={20}
                  className="cursor-pointer hover:text-blue-600"
                />
                {/* </Link> */}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
