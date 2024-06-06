import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
import { useAuth } from "../../context/AuthContext";
import { fetchUserData } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer/Footer";

const MyProfile = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, decodedTokenRole } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    referral: null,
    studentCount: null,
  });
  console.log(decodedTokenRole);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          referral: data.referralCode,
          studentCount: data.studentCount,
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
        // Handle error (e.g., redirect to login)
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="profile-wrap">
          <div className="profile-header">
            <div className="profile-pic">
              <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />{" "}
            </div>
            <div className="profile-info">
              <h1>Darkhan Bekuzak</h1>

              <h3>Username: {userData.username}</h3>
              <p>Email: {userData.email}</p>

              <p>Phone number: 8 (700) 690 27 11</p>

              <p>Role: {decodedTokenRole}</p>
            </div>
          </div>
          <div className="profile-details">
            {userData.studentCount !== null && (
              <p>
                <strong>Student Count:</strong> {userData.studentCount}
              </p>
            )}
            {userData.referral !== null && (
              <p>
                <strong>Referral Code:</strong> {userData.referral}
              </p>
            )}
            <button className="logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
