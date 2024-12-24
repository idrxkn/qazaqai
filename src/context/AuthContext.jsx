import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { fetchUserData } from "../api";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Store the role here

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token", error);
        // Handle error if token is invalid or expired
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserRole(data.Role);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole, // Function to dynamically set the role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
