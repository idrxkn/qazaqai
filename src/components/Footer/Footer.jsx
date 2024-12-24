import React from "react";
import "./Footer.css";
import logoWhite from "../../assets/logo-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer-content">
          <h1>ИННОВАЦИЯ. БЕЙІМ. ДАМУ.</h1>
          <p>
            Біз AI көмегімен білім беруде төңкеріс жасауға арналған озық ойлы
            топпыз. Біздің миссиямыз - әр студенттің ерекше қажеттіліктеріне
            бейімделген, деректерге негізделген оқыту тәжірибесін ұсыну. Білімді
            өзгерту және құлпын ашу жолында бізге қосылыңыз.
          </p>
          <div className="footer-buttons">
            <a href="https://forms.gle/9UV5tZ2RC3Ctjd9c7">
              <button className="footer-button contact-button">Байланыс</button>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 QazaqAI. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
