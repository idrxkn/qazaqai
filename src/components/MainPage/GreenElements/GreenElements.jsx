import React from "react";
import { motion } from "framer-motion";
import "./GreenElements.css";
import green from "../../../assets/green.png";

const greenElementVariants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      type: "spring",
      stiffness: 10,
    },
  }),
};

const GreenElements = () => {
  return (
    <>
      <motion.img
        src={green}
        className="green-element top-left"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={greenElementVariants}
      />
      <motion.img
        src={green}
        className="green-element bottom-right"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={greenElementVariants}
      />
    </>
  );
};

export default GreenElements;
