import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GreenElements from "./GreenElements/GreenElements";
import SliderComponent from "./Slider/Slider";
import EdMaterials from "./MainPageEls/EdMaterials";
import TestingMP from "./MainPageEls/TestingMP";
import ChatMP from "./MainPageEls/ChatMP";
import ForumMP from "./MainPageEls/ForumMP";
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

const MainPage = ({}) => {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleLanguageChange = () => {
      setIsReady(true);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Initially set the ready state
    setIsReady(true);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    isReady && (
      <div className="main-page">
        <GreenElements />
        <motion.div
          className="centered-text-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="centered-text">
            <motion.h1 className="rev" custom={0} variants={textVariants}>
              {t("mainPage.revolutionize")}
            </motion.h1>
            <div className="yourlear-wrap">
              <motion.h2
                className="yourlear"
                custom={1}
                variants={textVariants}
              >
                {t("mainPage.your")}
              </motion.h2>
              <motion.h1
                className="yourlear"
                custom={2}
                variants={textVariants}
              >
                {t("mainPage.learning")}
              </motion.h1>
            </div>
            <motion.h2 className="with" custom={3} variants={textVariants}>
              {t("mainPage.with")}
            </motion.h2>
            <motion.h1 className="ai" custom={4} variants={textVariants}>
              {t("mainPage.aiDriven")}
            </motion.h1>
            <motion.h2 className="edu" custom={5} variants={textVariants}>
              {t("mainPage.education")}
            </motion.h2>
          </div>
        </motion.div>
        <SliderComponent />
        <EdMaterials />
        <TestingMP />
        <ChatMP />
        <ForumMP />
        <AboutUsMP />
        <Bottom />
        <Footer />
      </div>
    )
  );
};

export default MainPage;
