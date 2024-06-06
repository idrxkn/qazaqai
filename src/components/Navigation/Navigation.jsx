import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const { t, i18n } = useTranslation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    document.body.classList.remove("lang-en", "lang-kz", "lang-ru");
    document.body.classList.add(`lang-${language}`);
  }, [language, i18n]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage.toLowerCase());
    // Add logic to change the language of the app
  };
  return (
    <nav className="navigation">
      <Link to="/">
        <div alt="Tüs In Logo" className="logo" />
      </Link>
      <div className="nav-links">
        <NavLink to="/educational-materials" className="nav-item">
          {t("nav.educationalMaterials")}
        </NavLink>
        <NavLink to="/testing" className="nav-item">
          {t("nav.testing")}
        </NavLink>
        <NavLink to="/chat" className="nav-item">
          {t("nav.virtualTeacher")}
        </NavLink>
        <NavLink to="/forum" className="nav-item">
          {t("nav.forum")}
        </NavLink>
        <NavLink to="/about-us-help" className="nav-item">
          {t("nav.aboutUsHelp")}
        </NavLink>
      </div>
      {isAuthenticated ? (
        <Link to="/myprofile">
          <button className="profile-button">My Profile</button>
        </Link>
      ) : (
        <div className="auth-buttons">
          <NavLink to="login">
            <button className="login-button">{t("nav.login")}</button>
          </NavLink>
          <NavLink to="signup">
            <button className="signup-button">{t("nav.signUp")}</button>
          </NavLink>
        </div>
      )}

      <Dropdown
        options={["EN", "KZ", "RU"]}
        defaultOption={language.toUpperCase()}
        selectedLanguage={language}
        onChange={handleLanguageChange}
      />
      <ToggleSwitch isOn={isDarkMode} handleToggle={handleToggle} />
    </nav>
  );
};

export default Navigation;
