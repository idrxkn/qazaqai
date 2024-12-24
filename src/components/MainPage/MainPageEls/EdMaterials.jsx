import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MainPageEls.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
const EdMaterials = () => {
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
        <FontAwesomeIcon icon="fa-solid fa-book-open" />
      </motion.div>
      <div className="els-text">
        <motion.h2 className="els-title" custom={0} variants={textVariants}>
          Кешенді оқу материалдары
        </motion.h2>
        <motion.p className="els-content" custom={1} variants={textVariants}>
          ҰБТ-ға дайындық материалдары мен кітаптарын, 5-сыныптың Алгребрасынан
          11-ші сыныптың Қазақстан тарихына дейінгі мектеп оқулықтарының,
          ресурстардың үлкен кітапханасын зерттеңіз!
        </motion.p>
        <Link to="/educational-materials">
          {" "}
          <motion.button
            className="els-button"
            custom={2}
            variants={textVariants}
          >
            Материалдарға өту
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EdMaterials;
