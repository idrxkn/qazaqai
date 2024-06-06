import React from "react";
import "./Footer.css";
import logoWhite from "../../assets/logo-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer-content">
          <h1>{t("footer.title")}</h1>
          <p>{t("footer.text")}</p>
          <div className="footer-buttons">
            <button className="footer-button insights-button">
              {t("footer.insights")}
            </button>
            <a href="https://forms.gle/9UV5tZ2RC3Ctjd9c7">
              <button className="footer-button contact-button">
                {t("footer.contact")}
              </button>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("footer.rights")}</p>
        </div>
        <div className="logo-list">
          <a
            href="https://www.instagram.com/idrxkn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-el">
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/darkhanbekuzak13/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-el">
              <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/darkhanbekuzak13/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-el">
              {" "}
              <FontAwesomeIcon icon="fa-brands fa-facebook" />
            </div>
          </a>
          <a
            href="https://www.tiktok.com/@idrxkn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-el">
              {" "}
              <FontAwesomeIcon icon="fa-brands fa-tiktok" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
