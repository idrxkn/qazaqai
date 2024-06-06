import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainPageEls.css";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const AboutUsMP = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 0.7,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        duration: 0.4,
      },
      zIndex: -100,
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: i * 0.4,
      },
    }),
  };

  return (
    <motion.div
      className="els-container"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="els-icons" variants={iconVariants}>
        <FontAwesomeIcon icon="fa-solid fa-people-group" />
      </motion.div>
      <div className="els-text">
        <motion.h2 className="els-title" custom={0} variants={textVariants}>
          {t("mainPageAbout.title")}
        </motion.h2>
        <motion.p className="els-content" custom={1} variants={textVariants}>
          {t("mainPageAbout.text")}
        </motion.p>
        <Link to="/about-us-help">
          <motion.button
            className="els-button"
            custom={2}
            variants={textVariants}
          >
            {t("mainPageAbout.button")}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default AboutUsMP;
