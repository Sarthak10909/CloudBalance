import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    return token && role
      ? {
          isAuthenticated: true,
          role: role,
        }
      : {
          isAuthenticated: false,
          role: null,
        };
  });

  const login = ({ accessToken, role }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", role);

    setAuth({
      isAuthenticated: true,
      role: role,
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    setAuth({
      isAuthenticated: false,
      role: null,
    });
  };

  const hasRole = (allowedRoles = []) => {
    if (!auth.isAuthenticated) return false;
    return allowedRoles.includes(auth.role);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
