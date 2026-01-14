import React from "react";
import { useNavigate } from "react-router-dom";
import UsersTable from "../pages/users/Table";
import { useAuth } from "../context/AuthContext";

function Users() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const canAddUser = auth.role === "ROLE_ADMIN";

  return (
    <div>
      {canAddUser && (
        <div className="py-5">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/users/addUser")}
          >
            Add New User
          </button>
        </div>
      )}

      <hr />
      <UsersTable />
    </div>
  );
}

export default Users;
