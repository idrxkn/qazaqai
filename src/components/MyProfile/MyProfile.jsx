import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
import { useAuth } from "../../context/AuthContext";
import { fetchUserData } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer/Footer";
import QRCode from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";

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
    teacherName: "",
    students: [],
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleToggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  const handleEditField = (field) => {
    setFormData({ [field]: userData[field] });
    setEditField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedData = { [editField]: formData[editField] };

      const response = await fetch("http://localhost:10000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setUserData((prevState) => ({
          ...prevState,
          ...updatedData,
        }));
        setEditField(null);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData({
          firstName: data.firstName || "No data",
          lastName: data.lastName || "No data",
          username: data.userName || "No data",
          email: data.email || "No data",
          phoneNumber: data.phoneNumber || "No data",
          referral: data.referralCode || "No data",
          studentCount: data.studentCount || "No data",
          teacherName: data.teacher ? data.teacher.teacherName : "No data",
          students: data.students || [],
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
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
              {decodedTokenRole === "Student" ? (
                <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-chalkboard-user" />
              )}
            </div>
            <div className="profile-info">
              <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
              <p>Role: {decodedTokenRole}</p>
            </div>
          </div>
          <div className="profile-details">
            {editField === "username" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditField(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <p>
                Username: {userData.username}{" "}
                <button onClick={() => handleEditField("username")}>
                  Edit
                </button>
              </p>
            )}
            {editField === "email" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditField(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <p>
                Email: {userData.email}{" "}
                <button onClick={() => handleEditField("email")}>Edit</button>
              </p>
            )}
            {editField === "phoneNumber" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditField(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <p>
                Phone number: {userData.phoneNumber}{" "}
                <button onClick={() => handleEditField("phoneNumber")}>
                  Edit
                </button>
              </p>
            )}
            {decodedTokenRole === "Student" ? (
              <p>
                <strong>Teacher Name:</strong> {userData.teacherName}
              </p>
            ) : (
              <>
                {userData.studentCount !== null && (
                  <p>
                    <strong>Student Count:</strong> {userData.studentCount}
                  </p>
                )}
                {userData.referral !== null && (
                  <>
                    <div className="referral-wrap">
                      <div className="referral">
                        <p>
                          <strong>Referral Code:</strong> {userData.referral}
                        </p>
                        <button
                          onClick={handleToggleQRCode}
                          className="qr-button"
                        >
                          {showQRCode
                            ? "Hide QR"
                            : "Create a QR for the referral"}
                        </button>
                      </div>
                      <AnimatePresence>
                        {showQRCode && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.5 }}
                            className="qr"
                          >
                            <QRCode value={userData.referral} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
                {userData.students.length > 0 && (
                  <div>
                    <strong>Students:</strong>
                    <ol>
                      {userData.students.map((student) => (
                        <li key={student.studentId}>{student.studentName}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
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
