import React from "react";
import { useTranslation } from "react-i18next";
import "./Login.css";
import rightImage from "../../assets/rightImage.png";
import { Link } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      {" "}
      <Link to="/">
        <button className="home-button">{t("register.homeBtn")}</button>
      </Link>
      <div className="login-page">
        <div className="login-form">
          <h1>{t("login.title")}</h1>
          <p>{t("login.subtitle")}</p>
          <form>
            <div className="input-group">
              <label htmlFor="username">{t("login.username")}</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={t("login.usernamePlaceholder")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">{t("login.password")}</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("login.passwordPlaceholder")}
              />
            </div>
            <button type="submit" className="submit-button">
              {t("login.submit")}
            </button>
          </form>
          <div className="social-login">
            <p>{t("login.loginWithOthers")}</p>
            <button className="google-button">
              {t("login.loginWithGoogle")}
            </button>
            <button className="facebook-button">
              {t("login.loginWithFacebook")}
            </button>
          </div>
        </div>
        <div className="login-image">
          <img src={rightImage} alt="Decorative" />
        </div>
      </div>
    </>
  );
};

export default Login;
