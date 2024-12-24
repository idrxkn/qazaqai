import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatAsker.css";
import logo from "../../../assets/logo.svg";
import teacherIcon from "../../../assets/teachersx.png";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ChatAsker = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [introText, setIntroText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [testFinished, setTestFinished] = useState(false); // Test completion state
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState({ answer: "" });
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // Current question ID
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(true); // Guard for unanswered question

  const messageEnd = useRef(null);

  const fullIntroMessage =
    "Сәәлем, бұл бұрынсоңды болмаған уникалды чат! Енді сен маған емес, мен саған сұрақ қойып, жауаптарыңды бағалайтын боламын.";

  useEffect(() => {
    const introShown = localStorage.getItem("introShown");
    if (introShown) {
      setShowIntroduction(false);
      setShowChat(true);
      fetchRandomQuestion(); // Fetch the first question
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
    localStorage.setItem("introShown", "true"); // Mark introduction as shown
    fetchRandomQuestion(); // Fetch the first question
  };

  const fetchRandomQuestion = async () => {
    if (!isCurrentQuestionAnswered) {
      console.log("You must answer the current question before proceeding.");
      return; // Prevent fetching a new question
    }

    try {
      const response = await axios.get(
        "http://localhost:10000/api/model/ask-random-question"
      );
      const { id, question } = response.data;
      setCurrentQuestionId(id);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "system",
          text: question,
        },
      ]);
      setIsCurrentQuestionAnswered(false); // Mark the new question as unanswered
    } catch (error) {
      console.error("Failed to fetch random question:", error);
    }
  };

  const handleAnswerSubmit = async () => {
    if (inputData.answer.trim() === "") return;

    const userMessage = { type: "user", text: inputData.answer };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing. Please log in again.");
        return;
      }
      await axios.post(
        "http://localhost:10000/api/model/evaluate",
        {
          question_id: currentQuestionId,
          user_answer: inputData.answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );

      setIsCurrentQuestionAnswered(true); // Mark the question as answered
      fetchRandomQuestion(); // Fetch the next question
    } catch (error) {
      console.error("Failed to submit the answer:", error);
    }

    setInputData({ answer: "" });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleAnswerSubmit();
  };

  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const handleIntroductionExitComplete = () => {
    setMessages([
      {
        type: "system",
        text: "Қош келдіңіз! Мен сізге сұрақтар қоямын, сіз жауап бересіз, және мен сіздің жауаптарыңызды бағалайтын боламын.",
      },
    ]);
    setShowChat(true);

    setTimeout(() => {
      fetchRandomQuestion(); // Fetch the first question when the chat starts
    }, 500);
  };

  const finishTest = () => {
    setTestFinished(true); // Mark the test as finished
  };

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
          <motion.div
            className="ask-chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="ask-chat-header">
              <img src={logo} alt="Logo" className="ask-chat-logo" />
              <h3>Сұрақ-Жауап Сеансы</h3>
            </div>
            <div className="ask-chat-body">
              <div className="ask-chat-messages">
                {messages.map((message, index) => {
                  const isSystem = message.type === "system";
                  return (
                    <motion.div
                      key={index}
                      className={`ask-chat-message ${message.type}`}
                      initial={{ opacity: 0, x: isSystem ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {isSystem && (
                        <div className="teacher-icon-ask">
                          <img
                            src={teacherIcon}
                            alt=""
                            className="teacher-img-ask"
                          />
                        </div>
                      )}
                      <p>
                        <strong>{isSystem ? "Q:" : "A:"}</strong> {message.text}
                      </p>
                    </motion.div>
                  );
                })}
                <div ref={messageEnd} />
              </div>
              <div className="ask-chat-input">
                <input
                  type="text"
                  placeholder="Жауабыңызды жазыңыз..."
                  value={inputData.answer}
                  onChange={(e) =>
                    setInputData({ ...inputData, answer: e.target.value })
                  }
                  onKeyDown={handleEnter}
                />
                <button onClick={handleAnswerSubmit}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                </button>
              </div>
            </div>
            <div className="ask-chat-footer">
              <button className="finish-test-btn" onClick={finishTest}>
                Тестті бітіру
              </button>
            </div>
          </motion.div>
        )}

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
