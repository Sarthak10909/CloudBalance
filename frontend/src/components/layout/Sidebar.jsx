import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Users, UserPlus, BarChart3, Cloud } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { collapsed } = useContext(UserContext);
  const { auth } = useAuth();
  const location = useLocation();

  const role = auth.role;

  const isActive = (path) => location.pathname === `/dashboard/${path}`;

  return (
    <div
      className={`bg-white border-r min-h-[calc(100vh-132px)] transition-all duration-300
        ${collapsed ? "w-[60px]" : "w-64"}`}
    >

      {(role === "ROLE_ADMIN" || role === "ROLE_READ_ONLY") && (
        <Link to="/dashboard/users">
          <div
            className={`flex items-center gap-3 p-4 cursor-pointer rounded-md text-nowrap
            hover:bg-blue-200 ${
              isActive("users")
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            <Users size={24} />
            {!collapsed && <h4>User Management</h4>}
          </div>
        </Link>
      )}

      {role === "ROLE_ADMIN" && (
        <Link to="/dashboard/onboarding">
          <div
            className={`flex items-center gap-3 p-4 cursor-pointer rounded-md text-nowrap
            hover:bg-blue-200 ${
              isActive("onboarding")
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            <UserPlus size={24} />
            {!collapsed && <h4>Onboarding</h4>}
          </div>
        </Link>
      )}

      <Link to="/dashboard/cost">
        <div
          className={`flex items-center gap-3 p-4 cursor-pointer rounded-md text-nowrap
          hover:bg-blue-200 ${
            isActive("cost")
              ? "bg-blue-500 text-white"
              : "text-gray-700"
          }`}
        >
          <BarChart3 size={24} />
          {!collapsed && <h4>Cost Explorer</h4>}
        </div>
      </Link>

      {role === "ROLE_ADMIN" && (
        <Link to="/dashboard/aws">
          <div
            className={`flex items-center gap-3 p-4 cursor-pointer rounded-md text-nowrap
            hover:bg-blue-200 ${
              isActive("aws")
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
          >
            <Cloud size={24} />
            {!collapsed && <h4>AWS Services</h4>}
          </div>
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
