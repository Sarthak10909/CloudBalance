import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // adjust path
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {

        await axiosInstance.post("/logout");
      } catch (error) {
        console.error("Logout API failed:", error);
      } finally {

        logout();
        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null; 
};

export default Logout;
