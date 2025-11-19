import React, { useState, useEffect } from "react";
import teacher from "../../assets/kundz.png";
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
  const [commentInput, setCommentInput] = useState({});
  const { setIsAuthenticated, userRole, setUserRole } = useAuth(); // Access and set role from context
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

      const response = await fetch(
        "https://qazaqai-api-production-211e.up.railway.app/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        setUserData((prevState) => ({
          ...prevState,
          ...updatedData,
        }));
        setEditField(null);
      } else {
        console.error("Профильді жаңартуда қате кетті");
      }
    } catch (error) {
      console.error("Қате:", error);
    }
  };
  const handleAddComment = async (e, studentId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const comment = commentInput[studentId];
    if (!comment) return;

    try {
      const response = await fetch(
        `https://qazaqai-api-production-211e.up.railway.app/students/${studentId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (response.ok) {
        alert("Пікір сәтті жіберілді!");
        setCommentInput({ ...commentInput, [studentId]: "" });
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        console.log("API Response:", data); // Log the full response here

        setUserData({
          firstName: data.firstName || "Дерек жоқ",
          lastName: data.lastName || "Дерек жоқ",
          username: data.UserName || "Дерек жоқ",
          email: data.Email || "Дерек жоқ",
          phoneNumber: data.PhoneNumber || "Дерек жоқ",
          referral: data.ReferralCode || "Дерек жоқ",
          studentCount: data.StudentCount || "0",
          role: data.Role || "Дерек жоқ",
          teacherName: data.Teacher ? data.Teacher.TeacherName : "Дерек жоқ",
          students: data.Students || [],
          testResults: data.TestResults || [],
          modelTestResults: data.ModelTestResults || [],
          Comments: data.Comments || [],
        });
        setUserRole(data.Role);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getUserData();
  }, [setUserRole]);

  // Convert role to Kazakh if needed:
  const roleText =
    userData.role !== "Teacher"
      ? "Оқушы"
      : userData.role === "Teacher"
      ? "Мұғалім"
      : userData.role;

  return (
    <>
      <div className="profile-page">
        <div className="profile-wrap">
          <div className="profile-header">
            <div className="profile-pic">
              <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
            </div>

            <div className="profile-inf">
              <h1>{userData.username}</h1>

              <p className="roles">Рөлі: {roleText}</p>
            </div>
          </div>
          <div className="profile-details">
            {editField === "username" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Пайдаланушы аты</label>

                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="usr-form"
                  />
                </div>
                <button type="submit" className="sv-btn">
                  Сақтау
                </button>
                <button
                  type="button"
                  onClick={() => setEditField(null)}
                  className="cn-btn"
                >
                  Бас тарту
                </button>
              </form>
            ) : (
              <p>
                Пайдаланушы аты: {userData.username}{" "}
                <button
                  onClick={() => handleEditField("username")}
                  className="edit-btn"
                >
                  Өңдеу
                </button>
              </p>
            )}
            {editField === "email" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Электрондық пошта</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="usr-form"
                  />
                </div>
                <button type="submit" className="sv-btn">
                  Сақтау
                </button>
                <button
                  type="button"
                  onClick={() => setEditField(null)}
                  className="cn-btn"
                >
                  Бас тарту
                </button>
              </form>
            ) : (
              <p>
                Электрондық пошта: {userData.email}{" "}
                <button
                  onClick={() => handleEditField("email")}
                  className="edit-btn"
                >
                  Өңдеу
                </button>
              </p>
            )}
            {editField === "phoneNumber" ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Телефон нөмірі</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="usr-form"
                  />
                </div>
                <button type="submit" className="sv-btn">
                  Сақтау
                </button>
                <button
                  type="button"
                  onClick={() => setEditField(null)}
                  className="cn-btn"
                >
                  Бас тарту
                </button>
              </form>
            ) : (
              <p>
                Телефон нөмірі: {userData.phoneNumber}{" "}
                <button
                  onClick={() => handleEditField("phoneNumber")}
                  className="edit-btn"
                >
                  Өңдеу
                </button>
              </p>
            )}
            {userData.role !== "Teacher" ? (
              <p>
                <strong>Мұғалімнің аты:</strong> {userData.teacherName}
              </p>
            ) : (
              <>
                {userData.studentCount !== null && (
                  <p>
                    <strong>Оқушылар саны:</strong> {userData.studentCount}
                  </p>
                )}
                {userData.referral !== null && (
                  <>
                    <div className="referral-wrap">
                      <div className="referral">
                        <p>
                          <strong>Реферал коды:</strong> {userData.referral}
                        </p>
                        <button
                          onClick={handleToggleQRCode}
                          className="qr-button"
                        >
                          {showQRCode ? "QR-ды жасыру" : "Рефералға QR жасау"}
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
                {userData.role === "Teacher" &&
                  userData.students &&
                  userData.students.length > 0 && (
                    <div className="teacher-students-section">
                      <h2>Менің оқушыларым</h2>
                      {userData.students.map((student) => (
                        <div key={student.StudentId} className="student-box">
                          <ol>
                            <li>
                              <p>
                                <strong>Оқушы:</strong> {student.StudentName}
                              </p>
                            </li>
                          </ol>

                          {/* Accordion for test results */}
                          <div className="test-results-section">
                            <details>
                              <summary>Тест нәтижелері</summary>
                              {student.TestResults &&
                              student.TestResults.length > 0 ? (
                                <ul className="student-test-results">
                                  {student.TestResults.map((result, i) => (
                                    <li key={i}>
                                      <strong>📋 {result.testName}</strong>
                                      <p>Тақырыбы: {result.testTopic}</p>
                                      <p>Сұрақ саны: {result.totalQuestions}</p>
                                      <p>
                                        ✅ Дұрыс жауаптар:{" "}
                                        {result.rightAnswersCount}
                                      </p>
                                      <p>
                                        ❌ Қате жауаптар:{" "}
                                        {result.wrongAnswersCount}
                                      </p>
                                      <p>
                                        📚 Тақырыптар:{" "}
                                        {result.subTopics.join(", ")}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>Тест нәтижелері жоқ</p>
                              )}
                            </details>
                          </div>
                          {student.ModelTestResults &&
                            student.ModelTestResults.length > 0 && (
                              <div className="test-results-section">
                                <details>
                                  <summary>
                                    Модель бойынша тест нәтижелері
                                  </summary>
                                  <ul className="student-test-results">
                                    {student.ModelTestResults.map(
                                      (result, idx) => (
                                        <li key={idx}>
                                          <strong>📋 Сұрақ:</strong>{" "}
                                          {result.question}
                                          <p>
                                            📝 Сіздің жауабыңыз:{" "}
                                            {result.user_answer}
                                          </p>
                                          <p>
                                            💯 Ұқсастық ұпайы:{" "}
                                            {result.similarity_score
                                              ? `${result.similarity_score}%`
                                              : "0%"}
                                          </p>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </details>
                              </div>
                            )}
                          {/* Comment form for teacher to add comments for this student */}
                          <form
                            onSubmit={(e) =>
                              handleAddComment(e, student.StudentId)
                            }
                            className="comment-form"
                          >
                            <input
                              type="text"
                              placeholder="Оқушыға пікір қалдыру..."
                              value={commentInput[student.StudentId] || ""}
                              onChange={(e) =>
                                setCommentInput({
                                  ...commentInput,
                                  [student.StudentId]: e.target.value,
                                })
                              }
                              className="comment-input"
                            />
                            <button
                              type="submit"
                              className="comment-submit-btn"
                            >
                              Жіберу
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
              </>
            )}
            {userData.modelTestResults &&
              userData.modelTestResults.length > 0 && (
                <div className="test-results-section">
                  <details>
                    <summary>Модель бойынша тест нәтижелері</summary>
                    <ul className="student-test-results">
                      {userData.modelTestResults.map((result, index) => (
                        <li key={index}>
                          <strong>📋 Сұрақ:</strong> {result.question}
                          <p>📝 Сіздің жауабыңыз: {result.user_answer}</p>
                          <p>
                            💯 Ұқсастық ұпайы:{" "}
                            {result.similarity_score
                              ? `${result.similarity_score}%`
                              : "0%"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
            {userData.testResults && userData.testResults.length > 0 ? (
              <div className="test-results-section">
                <details>
                  <summary>Тест нәтижелері</summary>
                  <ul className="student-test-results">
                    {userData.testResults.map((test, index) => (
                      <li key={index}>
                        <strong>📋 {test.testName}</strong>
                        <p>Тақырыбы: {test.testTopic}</p>
                        <p>Сұрақ саны: {test.totalQuestions}</p>
                        <p>✅ Дұрыс жауаптар: {test.rightAnswersCount}</p>
                        <p>❌ Қате жауаптар: {test.wrongAnswersCount}</p>
                        <p>📚 Тақырыптар: {test.subTopics.join(", ")}</p>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ) : (
              " "
            )}
            {userData.role !== "Teacher" &&
              userData.Comments &&
              userData.Comments.length > 0 && (
                <div className="comments-section">
                  <h2>Мұғалімнің пікірлері</h2>
                  <ul>
                    {userData.Comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}

            <button className="logout" onClick={handleLogout}>
              Шығу
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
