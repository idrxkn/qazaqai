import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logo.svg";
import teacherIcon from "../../../assets/teachersx.png";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";

const Chat = () => {
  const { isAuthenticated } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({ question: "" });
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const messageEnd = useRef(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, currentBotMessage]);

  const handleSubmit = async () => {
    if (inputData.question.trim() === "") return;

    const userMessage = { type: "user", text: inputData.question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    const currentLanguage = i18n.language;
    const apiUrl =
      "https://qaz-b-production.up.railway.app/api/model/get-answer";
    try {
      const response = await axios.post(
        apiUrl,
        { question: inputData.question },
        { headers: { "Content-Type": "application/json" } }
      );

      // Call typeWriterEffect with both answer and context:
      typeWriterEffect(response.data.model_answer, response.data.context);
    } catch (error) {
      typeWriterEffect(
        `Сіздің сұрауыңыз "${inputData.question}" бойынша деректер табылмады. Басқа нәрсені жазып көріңіз.`,
        null
      );
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
    setInputData({ question: "" });
  };

  const typeWriterEffect = (text, context) => {
    let i = -1;
    setCurrentBotMessage("");

    const intervalId = setInterval(() => {
      setCurrentBotMessage((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);

        // Once typing is done, add the teacher message with context to messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "teacher bot", text, context },
        ]);

        setCurrentBotMessage("");
      }
    }, 30);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSubmit();
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <p className="please-signin">
          Өтініш, чатқа кіру үшін{" "}
          <Link to="/login" className="link-spacing">
            {" "}
            тіркеліңіз{" "}
          </Link>{" "}
        </p>
      </>
    );
  }

  return (
    <>
      <div className="chatbot">
        <div className="sidebar">
          <div className="upper-side">
            <div className="upper-side-header">
              <div className="upper-side-header-logo">
                <img src={logo} alt="" />
              </div>
              <button
                className="new-chat"
                onClick={() => window.location.reload()}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" /> {t("chat.new")}
              </button>
            </div>
            <div className="upper-side-bottom">
              {messages.length > 0 && (
                <div className="query">
                  <FontAwesomeIcon icon="fa-solid fa-message" />
                  <p>{messages[0].text}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-side">
            <Link to="/">
              <button className="home-btn">
                <FontAwesomeIcon icon="fa-solid fa-door-open" />{" "}
                {t("chat.home")}
              </button>
            </Link>
          </div>
        </div>

        <div className="main">
          <div className="chats">
            {messages.map((message, index) => (
              <div key={index} className={`chat ${message.type}`}>
                {message.type === "teacher bot" && (
                  <div className="teacher-icon">
                    <img src={teacherIcon} alt="" className="teacher-img" />
                  </div>
                )}
                <div className="chat-txt">
                  <p className="txt">{message.text}</p>
                  {/* If there's context, show an accordion below the message */}
                  {message.type === "teacher bot" && message.context && (
                    <details className="context-accordion">
                      <summary>Контекстті көру</summary>
                      <div className="context-content">{message.context}</div>
                    </details>
                  )}
                </div>
              </div>
            ))}
            {currentBotMessage && (
              <div className="chat teacher bot">
                <div className="teacher-icon">
                  <img src={teacherIcon} alt="" className="teacher-img" />
                </div>
                <p className="txt">{currentBotMessage}</p>
              </div>
            )}
            {loading && (
              <div className="chat teacher bot">
                <div className="teacher-icon">
                  <img src={teacherIcon} alt="" className="teacher-img" />
                </div>
                <p className="txt">Жауап дайындалуда...</p>
              </div>
            )}
            <div ref={messageEnd} />
          </div>
          <div className="chat-bottom">
            <div className="chat-input">
              <input
                type="text"
                name="question"
                id="question"
                placeholder={t("chat.placeholder")}
                value={inputData.question}
                onChange={(e) =>
                  setInputData({ ...inputData, question: e.target.value })
                }
                onKeyDown={handleEnter}
              />
              <button className="chat-input-submit" onClick={handleSubmit}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
              </button>
            </div>
            <p className="danger-txt">
              QazaqAI қателесуі әбден мүмкін, маңызды ақпаратты тексеріңіз.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
