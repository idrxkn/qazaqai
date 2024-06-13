import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // import dependency
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import rightImage from "../../assets/rightImage.png";

const BASE_URL = "http://localhost:10000/";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { setIsAuthenticated, setDecodedTokenRole, decodedTokenRole } =
    useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}api/auth/signin`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setError(null);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setDecodedTokenRole(decodedToken.role);
      console.log(decodedToken.role);
      setIsAuthenticated(true);
      navigate("/"); // Redirect to main page
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        // Check if there's a general message
        let errorMessage = errorData.message || "An error occurred";
        // Check if there are specific field errors
        if (errorData.errors) {
          const fieldErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
            .join(" ");
          errorMessage = `${errorMessage} ${fieldErrors}`;
        }
        setError(errorMessage);
      } else {
        setError("An error occurred");
      }
    }
  };

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
        <div className="login-image">
          <img src={rightImage} alt="Decorative" />
        </div>
      </div>
    </>
  );
};

export default Login;
