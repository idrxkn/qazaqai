import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal"; // Adjust path if necessary

import "./SignUp.css";

import rightImage from "../../assets/greeting-right.png";
const BASE_URL = "http://0.0.0.0:8080";

const SignUp = () => {
  const { t } = useTranslation();
  const [showReferral, setShowReferral] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referral: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setShowReferral(!showReferral);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}api/auth/signup`, formData);
      setSuccess(true);
      setError(null);
      setShowPopup(true);
      console.log("User successfully created");
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        // Check if there's a general message
        let errorMessage = errorData;
        // Check if there are specific field errors
        if (errorData.errors) {
          const fieldErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
            .join(" ");
          errorMessage = `${errorMessage} ${fieldErrors}`;
        }
        setError(errorMessage);
      } else {
        setError(errorData);
      }
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 3000); // Show the popup for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  return (
    <>
      <Link to="/">
        <button className="home-button">{t("register.homeBtn")}</button>
      </Link>
      <div className="register-page">
        <div className="register-form">
          <h1>{t("register.title")}</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">{t("register.username")}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("register.usernamePlaceholder")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">{t("register.login")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("register.loginPlaceholder")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">{t("register.password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("register.passwordPlaceholder")}
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isStudent"
                name="isStudent"
                checked={showReferral}
                onChange={handleCheckboxChange}
                className="isStudentCheckbox"
              />
              <label className="isStudent" htmlFor="isStudent">
                {t("register.isStudent")}
              </label>
            </div>
            {showReferral && (
              <div className="input-group">
                <label htmlFor="referral">{t("register.referral")}</label>
                <input
                  type="text"
                  className="referral"
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  placeholder={t("register.referralPlaceholder")}
                />
              </div>
            )}
            <button type="submit" className="submit-button">
              {t("register.submit")}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message">{t("register.success")}</p>
          )}
        </div>
        <div className="greeting-right">
          <img src={rightImage} alt="Decorative" />
        </div>
      </div>
      <Modal show={showPopup} onClose={() => setShowPopup(false)}>
        <p>Сәтті аяқталды!</p>
      </Modal>
    </>
  );
};

export default SignUp;
