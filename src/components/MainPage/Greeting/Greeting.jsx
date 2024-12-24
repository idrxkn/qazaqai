import React from "react";
import { motion } from "framer-motion";
import "./Greeting.css";
import oyu from "../../../assets/greeting-right.png";
import greetingBottom from "../../../assets/greeting-bottom.png";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
    },
  },
};

const Greeting = () => {
  return (
    <div>
      <motion.div
        className="greeting"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="greeting-left">
          <motion.h1 className="greeting-title" variants={textVariants}>
            Қош келдің!
          </motion.h1>
          <motion.p className="greeting-subtitle" variants={textVariants}>
            Интеллект — бұл тек ойлау емес, сонымен қатар үйрену. Жасанды
            интеллект осыны шексіз етеді. <br /> <br />
            Бізбен бірге заманауи ақпараттық жүйелердің артықшылықтарын сезіне
            аласың.
            <br /> <br />
            <span>Қазақстанның болашағы – cенің қолыңда!</span>
          </motion.p>
        </div>
        <motion.div className="greeting-right" variants={textVariants}>
          <img src={oyu} alt="Greeting Illustration" />
        </motion.div>
      </motion.div>
      <img
        src={greetingBottom}
        alt="Greeting Bottom Decoration"
        className="greetingb"
        variants={textVariants}
      />
    </div>
  );
};

export default Greeting;
