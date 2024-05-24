import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "./SignUp.css";
import rightImage from "../../assets/rightImage.png"; // Adjust path accordingly

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to="/">
        <button className="home-button">{t("register.homeBtn")}</button>
      </Link>
      <div className="register-page">
        <div className="register-form">
          <h1>{t("register.title")}</h1>
          <form>
            <div className="input-group">
              <label htmlFor="username">{t("register.username")}</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={t("register.usernamePlaceholder")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">{t("register.password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("register.passwordPlaceholder")}
              />
            </div>
            <button type="submit" className="submit-button">
              {t("register.submit")}
            </button>
          </form>
          <div className="social-login">
            <p>{t("register.loginWithOthers")}</p>
            <button className="google-button">
              {t("register.loginWithGoogle")}
            </button>
          </div>
        </div>
        <div className="register-image">
          <img src={rightImage} alt="Decorative" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
