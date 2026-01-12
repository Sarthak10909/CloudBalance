import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login"
import Dashboard from "../src/pages/dashboard/Dashboard";
import UserContextProvider from "./context/UserContextProvider";
import Onboarding from "./components/Onboarding";
import CostExplorer from "./components/costExplorer/CostExplorer";
import AwsServices from "./components/AwsServices";
import Users from "./components/Users";
import AddUser from "../src/pages/users/AddUser";
import { ToastContainer } from "react-toastify";
import EditUser from "../src/pages/users/EditUser";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route index element={<Users />} /> */}

            <Route path="users" element={<Users />} />

            <Route path="users/addUser" element={<AddUser />} />
            <Route path="users/editUsers" element={<EditUser />} />

            <Route path="onboarding" element={<Onboarding />} />
            <Route path="cost" element={<CostExplorer />} />
            <Route path="aws" element={<AwsServices/>} />

          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </UserContextProvider>

    </>
  );
}

export default App;
