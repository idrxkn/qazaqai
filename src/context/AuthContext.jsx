import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decodedTokenRole, setDecodedTokenRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecodedTokenRole(decodedToken.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token", error);
        // Handle error if token is invalid or expired
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        decodedTokenRole,
        setDecodedTokenRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
