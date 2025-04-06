import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserData } from "../../api";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import rightImage from "../../assets/greeting-right.png";

const BASE_URL = "https://qazaqai-api-production.up.railway.app/";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { setIsAuthenticated, userRole, setUserRole } = useAuth(); // Correct function name

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}api/auth/signin`, formData);

      // Ensure token exists in the response
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log("Received Token:", token);

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Decode the token safely
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
        }

        // Update auth state
        setError(null); // Clear error
        setIsAuthenticated(true);

        // Navigate to the main page
        navigate("/");
      } else {
        throw new Error("Token missing from response.");
      }
    } catch (err) {
      const errorData = err.response?.data;

      if (errorData) {
        let errorMessage = errorData.message || "Қате туындады";
        if (errorData.errors) {
          const fieldErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
            .join(" ");
          errorMessage = `${errorMessage} ${fieldErrors}`;
        }
        setError(errorMessage);
      } else {
        setError("Қате туындады");
      }
    }
  };

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
  }, [setUserRole]);

  return (
    <>
      <Link to="/">
        <button className="home-button">{t("register.homeBtn")}</button>
      </Link>
      <div className="login-page">
        <div className="login-form">
          <h1>{t("login.title")}</h1>
          <p>{t("login.subtitle")}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">{t("login.login")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("login.loginPlaceholder")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">{t("login.password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("login.passwordPlaceholder")}
              />
            </div>
            <button type="submit" className="submit-button">
              {t("login.submit")}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="greeting-right">
          <img src={rightImage} alt="Decorative" />
        </div>
      </div>
    </>
  );
};

export default Login;
