import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/Login"
import Dashboard from "../src/pages/dashboard/Dashboard";
import UserContextProvider from "./context/UserContextProvider";
import Onboarding from "../src/pages/onboarding/Onboarding";
import CostExplorer from "./components/costExplorer/CostExplorer";
import AwsServices from "./components/AwsServices";
import Users from "./components/Users";
import AddUser from "../src/pages/users/AddUser";
import { ToastContainer } from "react-toastify";
import EditUser from "../src/pages/users/EditUser";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <UserContextProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard (ALL authenticated users) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_READ_ONLY",
                    "ROLE_CUSTOMER",
                  ]}
                />
              }
            >
              <Route element={<Dashboard />}>
                {/* Cost Explorer → ALL roles */}
                <Route path="cost" element={<CostExplorer />} />

                {/* Users → ADMIN + READ_ONLY */}
                <Route
                  element={
                    <ProtectedRoute
                      allowedRoles={["ROLE_ADMIN", "ROLE_READ_ONLY"]}
                    />
                  }
                >
                  <Route path="users" element={<Users />} />
                </Route>

                {/* Add/Edit User + Onboarding + AWS → ADMIN only */}
                <Route
                  element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}
                >
                  <Route path="users/addUser" element={<AddUser />} />
                  <Route path="users/editUsers" element={<EditUser />} />
                  <Route path="onboarding" element={<Onboarding />} />
                  <Route path="aws" element={<AwsServices />} />
                </Route>
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<h1>404 | Page Not Found</h1>} />
          </Routes>

          <ToastContainer position="top-right" autoClose={2000} />
        </AuthProvider>

      </UserContextProvider>

    </>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Onboarding from "./pages/onboarding/Onboarding";
// import CostExplorer from "./components/costExplorer/CostExplorer";
// import AwsServices from "./components/AwsServices";
// import Users from "./components/Users";
// import AddUser from "./pages/users/AddUser";
// import EditUser from "./pages/users/EditUser";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]} />
//           }
//         >
//           <Route element={<Dashboard />}>
//             {/* Cost Explorer → ALL */}
//             <Route path="cost" element={<CostExplorer />} />

//             {/* Users → ADMIN + READ_ONLY */}
//             <Route
//               element={<ProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]} />}
//             >
//               <Route path="users" element={<Users />} />
//             </Route>

//             {/* Add/Edit User → ADMIN only */}
//             <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
//               <Route path="users/addUser" element={<AddUser />} />
//               <Route path="users/editUsers" element={<EditUser />} />
//               <Route path="onboarding" element={<Onboarding />} />
//               <Route path="aws" element={<AwsServices />} />
//             </Route>
//           </Route>
//         </Route>

//         {/* 404 */}
//         <Route path="*" element={<h1>404 | Page Not Found</h1>} />
//       </Routes>

//       <ToastContainer position="top-right" autoClose={2000} />
//     </>
//   );
// }

// export default App;

