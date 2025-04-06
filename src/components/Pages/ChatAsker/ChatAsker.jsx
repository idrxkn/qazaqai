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
  const { isAuthenticated } = useAuth();

  // Intro & chat states
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [introText, setIntroText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  // Messages & input
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState({ answer: "" });
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // For auto-scrolling
  const messageEnd = useRef(null);

  // Text that will be typed out in the intro
  const fullIntroMessage =
    "Сәәлем, бұл бұрынсоңды болмаған уникалды чат! Енді сен маған емес, мен саған сұрақ қойып, жауаптарыңды бағалайтын боламын.";

  // Always run the typing effect whenever the component mounts
  useEffect(() => {
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
  }, []);

  // Start the test: hide intro, show chat, fetch first question
  const startTest = () => {
    setShowIntroduction(false);
    setShowChat(true);
    fetchRandomQuestion();
  };

  // Fetch a random question from your backend
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

  // Handle user answer submission, then fetch next question
  const handleAnswerSubmit = async () => {
    if (inputData.answer.trim() === "" || isProcessing || testFinished) return;

    // Add user’s message
    setMessages((prev) => [...prev, { type: "user", text: inputData.answer }]);
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in again.");
        return;
      }

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

      // Clear input, get next question
      setInputData({ answer: "" });
      fetchRandomQuestion();
    } catch (error) {
      console.error("Failed to submit the answer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit on Enter key
  const handleEnter = (e) => {
    if (e.key === "Enter") handleAnswerSubmit();
  };

  // Auto-scroll to latest message
  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Clear everything and reset
  const clearChat = () => {
    setMessages([]);
    setCurrentQuestionId(null);
    setTestFinished(false);
    setShowChat(false);
    setShowIntroduction(true);
    setIntroText("");
    setTypingFinished(false);
    // We re-run the typing effect by unmounting/remounting or re-setting useEffect
  };

  // End the Q&A session
  const finishTest = () => {
    setTestFinished(true);
  };

  // If user is not authenticated, show a “please sign in” message
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
      {/* The introduction: typed text + teacher icon + start button */}
      <AnimatePresence>
        {showIntroduction && !testFinished && (
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

      {/* The chat area (only after user clicks “Тестілеуді бастау”) */}
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

            {/* BODY: messages + input */}
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

            {/* FOOTER: test finish button */}
            <div className="ask-chat-footer">
              <button className="finish-test-btn" onClick={finishTest}>
                Тестті бітіру
              </button>
            </div>
          </motion.div>
        )}

        {/* If the user finishes the test */}
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
