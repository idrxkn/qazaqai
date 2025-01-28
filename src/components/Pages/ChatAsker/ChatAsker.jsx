import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatAsker.css";
import logo from "../../../assets/logo.svg";
import teacherIcon from "../../../assets/teachersx.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ChatAsker = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [introText, setIntroText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState({ answer: "" });
  const { isAuthenticated } = useAuth();
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const messageEnd = useRef(null);
  const fullIntroMessage =
    "Сәәлем, бұл бұрынсоңды болмаған уникалды чат! Енді сен маған емес, мен саған сұрақ қойып, жауаптарыңды бағалайтын боламын.";

  useEffect(() => {
    const introShown = localStorage.getItem("introShown");
    if (introShown) {
      setShowIntroduction(false);
      setShowChat(true);
      if (messages.length === 0) fetchRandomQuestion();
    } else {
      let index = 0;
      const timer = setInterval(() => {
        setIntroText((prev) => prev + fullIntroMessage.charAt(index));
        index++;
        if (index >= fullIntroMessage.length) {
          clearInterval(timer);
          setTypingFinished(true);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, []);

  const startTest = () => {
    setShowIntroduction(false);
    localStorage.setItem("introShown", "true");
    fetchRandomQuestion();
  };

  const fetchRandomQuestion = async () => {
    if (isProcessing || testFinished) return;

    setIsProcessing(true);

    try {
      const response = await axios.get(
        "https://qaz-b-production.up.railway.app/api/model/ask-random-question"
      );
      const { id, question } = response.data;
      setCurrentQuestionId(id);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "system", text: question },
      ]);
    } catch (error) {
      console.error("Failed to fetch random question:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (inputData.answer.trim() === "" || isProcessing || testFinished) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: inputData.answer },
    ]);

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in again.");
        return;
      }

      await axios.post(
        "https://qaz-b-production.up.railway.app/api/model/evaluate",
        { question_id: currentQuestionId, user_answer: inputData.answer },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInputData({ answer: "" });
      fetchRandomQuestion();
    } catch (error) {
      console.error("Failed to submit the answer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleAnswerSubmit();
  };

  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleIntroductionExitComplete = () => {
    setMessages([
      { type: "system", text: "Қош келдіңіз! Сіз жауап бересіз, мен бағалаймын." },
    ]);
    setShowChat(true);
    setTimeout(fetchRandomQuestion, 500);
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentQuestionId(null);
    setTestFinished(false);
    setShowChat(false);
    setShowIntroduction(true);
    localStorage.removeItem("introShown");
  };

  const finishTest = () => {
    setTestFinished(true);
  };

  if (!isAuthenticated) {
    return (
      <p className="please-signin">
        Өтініш, чатқа кіру үшін{" "}
        <Link to="/login" className="link-spacing">
          {" "}
          тіркеліңіз{" "}
        </Link>
      </p>
    );
  }

  return (
    <div className="asker-container">
      <AnimatePresence onExitComplete={handleIntroductionExitComplete}>
        {showIntroduction && (
          <motion.div
            className="introduction-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.img
                src={teacherIcon}
                alt="Intro"
                className="intro-img"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="intro-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {introText}
              </motion.div>
              {typingFinished && (
                <motion.button
                  className="start-test-btn"
                  onClick={startTest}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Тестілеуді бастау
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && !testFinished && (
          <motion.div className="ask-chat" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
            <div className="ask-chat-header">
              <img src={logo} alt="Logo" className="ask-chat-logo" />
              <h3>Сұрақ-Жауап Сеансы</h3>
              <button className="clear-chat-btn" onClick={clearChat}>
                🗑 Чатты тазарту
              </button>
            </div>
            <div className="ask-chat-footer">
              <button className="finish-test-btn" onClick={finishTest}>
                Тестті бітіру
              </button>
            </div>
          </motion.div>
        )}

        {testFinished && (
          <motion.div className="test-finish-message" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
            <h2>Сіздің жауаптарыңыз бағаланып, сәтті сақталды.</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAsker;
