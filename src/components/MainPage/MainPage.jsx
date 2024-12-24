import React, { useState, useEffect, useRef } from "react";
import "./MainPage.css";
import { motion, useAnimation } from "framer-motion";
import GreenElements from "./GreenElements/GreenElements";
import Greeting from "./Greeting/Greeting";
import SliderComponent from "./Slider/Slider";
import EdMaterials from "./MainPageEls/EdMaterials";
import TestingMP from "./MainPageEls/TestingMP";
import ChatMP from "./MainPageEls/ChatMP";
import AboutUsMP from "./MainPageEls/AboutUsMP";
import Bottom from "./Bottom/Bottom";
import Footer from "../Footer/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: i * 0.2,
    },
  }),
};

const MainPage = () => {
  const controls = useAnimation();
  const textRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [controls]);

  return (
    <div className="main-page">
      <GreenElements />
      <Greeting />
      <motion.div
        className="centered-text-wrap"
        ref={textRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="centered-text">
          <motion.h1 className="rev" custom={0} variants={textVariants}>
            ЖАСАНДЫ
          </motion.h1>
          <div className="yourlear-wrap">
            <motion.h2 className="yourlear" custom={1} variants={textVariants}>
              ИНТЕЛЛЕКТ
            </motion.h2>
            <motion.h1 className="yourlear" custom={2} variants={textVariants}>
              АРҚЫЛЫ
            </motion.h1>
          </div>
          <motion.h2 className="with" custom={3} variants={textVariants}>
            ОҚУЫҢДЫ
          </motion.h2>
          <motion.h1 className="ai" custom={4} variants={textVariants}>
            ТОЛЫҚТАЙ
          </motion.h1>
          <motion.h2 className="edu" custom={5} variants={textVariants}>
            ӨЗГЕРТ
          </motion.h2>
        </div>
      </motion.div>
      <SliderComponent />
      <EdMaterials />
      <TestingMP />
      <ChatMP />
      <AboutUsMP />
      <Bottom />
      <Footer />
    </div>
  );
};

export default MainPage;
