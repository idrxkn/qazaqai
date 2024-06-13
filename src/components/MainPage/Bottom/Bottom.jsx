import React from "react";
import "./Bottom.css";
import kazakh from "../../../assets/kz.jpg";
import russian from "../../../assets/russia.jpg";
import english from "../../../assets/britain.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Bottom = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        duration: 0.7,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: i * 0.4,
      },
    }),
  };

  const iconVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="bottom-wrap"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.span className="special-text" custom={0} variants={textVariants}>
        {t("mainPageBottom.weAre")}
        <span className="nomads"> {t("mainPageBottom.nomads")}</span>
      </motion.span>

      <motion.h1 className="bottom-title" custom={1} variants={textVariants}>
        {t("mainPageBottom.forte")}
        <br />
      </motion.h1>

      <motion.p className="bottom-text" custom={2} variants={textVariants}>
        {t("mainPageBottom.available")}
      </motion.p>

      <div className="lang-imgs">
        <div className="lang">
          <motion.img
            src={kazakh}
            alt=""
            className="lang-img kaz"
            custom={3}
            variants={textVariants}
          />
          <motion.p
            className="lang-text kaz"
            custom={3}
            variants={textVariants}
          >
            Қазақша
          </motion.p>
        </div>
        <div className="lang">
          <motion.img
            src={russian}
            alt=""
            className="lang-img rus"
            custom={4}
            variants={textVariants}
          />
          <motion.p
            className="lang-text rus"
            custom={4}
            variants={textVariants}
          >
            Русский
          </motion.p>
        </div>
        <div className="lang">
          <motion.img
            src={english}
            alt=""
            className="lang-img eng"
            custom={5}
            variants={textVariants}
          />
          <motion.p className="lang-text" custom={5} variants={textVariants}>
            English
          </motion.p>
        </div>
      </div>

      <div className="interest-title">
        <motion.div className="interes1" custom={6} variants={textVariants}>
          {t("mainPageBottom.intthen")}{" "}
          <span className="join-wrap">
            <Link to="/signup" className="join">
              {t("mainPageBottom.join")}
            </Link>{" "}
          </span>
          {t("mainPageBottom.us")}
        </motion.div>
        <motion.div className="fast" custom={7} variants={textVariants}>
          {t("mainPageBottom.fast")}
        </motion.div>
        <motion.div className="first" custom={8} variants={iconVariants}>
          <FontAwesomeIcon icon="fa-solid fa-paw" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bottom;
