import React from "react";
import "./Bottom.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Bottom = () => {
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
      <div className="interest-title">
        <motion.div className="interes1" custom={1} variants={textVariants}>
          Қызық па? Онда бізге{" "}
          <span className="join-wrap">
            <Link to="/signup" className="join">
              қосыл
            </Link>{" "}
          </span>
        </motion.div>
        <motion.div className="fast" custom={2} variants={textVariants}>
          ТЕЗ ТЕЗ!
        </motion.div>
        <motion.div
          className="first"
          custom={3}
          variants={iconVariants}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Bottom;
