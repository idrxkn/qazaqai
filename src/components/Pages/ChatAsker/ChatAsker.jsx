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

  // Text that "types out" during the introduction
  const fullIntroMessage =
    "Сәәлем, бұл бұрынсоңды болмаған уникалды чат! Енді сен маған емес, мен саған сұрақ қойып, жауаптарыңды бағалайтын боламын.";

  // On mount, check if intro has already been shown
  useEffect(() => {
    const introShown = localStorage.getItem("introShown");
    if (introShown) {
      // If user has seen intro, go straight to chat
      setShowIntroduction(false);
      setShowChat(true);
      // If no messages yet, fetch the first question
      if (messages.length === 0) {
        fetchRandomQuestion();
      }
    } else {
      // Otherwise, "type out" the introduction text
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
    // eslint-disable-next-line
  }, []);

  // Start test: hide intro, show chat, fetch question
  const startTest = () => {
    setShowIntroduction(false);
    localStorage.setItem("introShown", "true");
    fetchRandomQuestion();
  };

  // Fetch a new question from backend
  const fetchRandomQuestion = async () => {
    if (isProcessing || testFinished) return;
    setIsProcessing(true);

    try {
      const response = await axios.get(
        "https://qazaqai-api-production.up.railway.app/api/model/ask-random-question"
      );
      const { id, question } = response.data;
      setCurrentQuestionId(id);
      setMessages((prev) => [...prev, { type: "system", text: question }]);
    } catch (error) {
      console.error("Failed to fetch random question:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit user answer, then fetch next question
  const handleAnswerSubmit = async () => {
    if (inputData.answer.trim() === "" || isProcessing || testFinished) return;

    // Add user’s answer to the messages
    setMessages((prev) => [...prev, { type: "user", text: inputData.answer }]);
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in again.");
        return;
      }

      // Send the user’s answer to the backend
      await axios.post(
        "https://qazaqai-api-production.up.railway.app/api/model/evaluate",
        { question_id: currentQuestionId, user_answer: inputData.answer },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the input and get next question
      setInputData({ answer: "" });
      fetchRandomQuestion();
    } catch (error) {
      console.error("Failed to submit the answer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // If user presses Enter, submit answer
  const handleEnter = (e) => {
    if (e.key === "Enter") handleAnswerSubmit();
  };

  // Auto-scroll to bottom of chat when messages update
  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Runs once the introduction has animated out
  const handleIntroductionExitComplete = () => {
    // Show a quick system welcome, then start chat
    setMessages([
      {
        type: "system",
        text: "Қош келдіңіз! Сіз жауап бересіз, мен бағалаймын.",
      },
    ]);
    setShowChat(true);
    setTimeout(fetchRandomQuestion, 500);
  };

  // Clear the chat and reset
  const clearChat = () => {
    setMessages([]);
    setCurrentQuestionId(null);
    setTestFinished(false);
    setShowChat(false);
    setShowIntroduction(true);
    localStorage.removeItem("introShown");
  };

  // Finish test
  const finishTest = () => {
    setTestFinished(true);
  };

  // Require authentication
  if (!isAuthenticated) {
    return (
      <p className="please-signin">
        Өтініш, чатқа кіру үшін{" "}
        <Link to="/login" className="link-spacing">
          тіркеліңіз
        </Link>
      </p>
    );
  }

  return (
    <div className="asker-container">
      {/* INTRO SCREEN */}
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

      {/* CHAT & FINISH VIEW */}
      <AnimatePresence>
        {showChat && !testFinished && (
          <motion.div
            className="ask-chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {/* HEADER */}
            <div className="ask-chat-header">
              <img src={logo} alt="Logo" className="ask-chat-logo" />
              <h3>Сұрақ-Жауап Сеансы</h3>
              <button className="clear-chat-btn" onClick={clearChat}>
                🗑 Чатты тазарту
              </button>
            </div>

            {/* BODY */}
            <div className="ask-chat-body">
              <div className="ask-chat-messages">
                {messages.map((msg, idx) => {
                  const isSystem = msg.type === "system";
                  return (
                    <motion.div
                      key={idx}
                      className={`ask-chat-message ${msg.type}`}
                      initial={{ opacity: 0, x: isSystem ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Teacher icon for "system" messages */}
                      {isSystem && (
                        <div className="teacher-icon-ask">
                          <img
                            src={teacherIcon}
                            alt="Teacher"
                            className="teacher-img-ask"
                          />
                        </div>
                      )}
                      <p>{msg.text}</p>
                    </motion.div>
                  );
                })}
                <div ref={messageEnd} />
              </div>

              {/* INPUT FIELD */}
              <div className="ask-chat-input">
                <input
                  type="text"
                  placeholder="Жауабыңызды жазыңыз..."
                  value={inputData.answer}
                  onChange={(e) => setInputData({ answer: e.target.value })}
                  onKeyDown={handleEnter}
                />
                <button onClick={handleAnswerSubmit}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                </button>
              </div>
            </div>

            {/* FOOTER */}
            <div className="ask-chat-footer">
              <button className="finish-test-btn" onClick={finishTest}>
                Тестті бітіру
              </button>
            </div>
          </motion.div>
        )}

        {/* FINISHED STATE */}
        {testFinished && (
          <motion.div
            className="test-finish-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <h2>Сіздің жауаптарыңыз бағаланып, сәтті сақталды.</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAsker;
