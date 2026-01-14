import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:8080/dashboard/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const handleEdit = (user) => {
    navigate("/dashboard/users/editUsers", {
      state: { userId: user.id },
    });
  };

  const canEdit = auth.role === "ROLE_ADMIN";

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#dbeafe" }}>
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
                {canEdit && (
                  <Pencil
                    size={20}
                    onClick={() => handleEdit(user)}
                    className="cursor-pointer hover:text-blue-600"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
