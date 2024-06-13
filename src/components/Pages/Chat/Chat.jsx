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
      currentLanguage === "en"
        ? "http://127.0.0.1:7001/query"
        : currentLanguage === "ru"
        ? "http://127.0.0.1:7002/query"
        : "http://127.0.0.1:7000/query";
    try {
      const response = await axios.post(
        apiUrl,
        { question: inputData.question },
        { headers: { "Content-Type": "application/json" } }
      );

      typeWriterEffect(response.data.answer);
    } catch (error) {
      typeWriterEffect(
        currentLanguage === "en"
          ? `Could not retrieve data for ${inputData.question}. Please try something new.`
          : currentLanguage === "ru"
          ? `Не удалось получить данные для ${inputData.question}. Пожалуйста, попробуйте что-нибудь другое.`
          : `${inputData.question}} үшін деректер табылмады. Басқа нәрсені жазып көріңіз.`
      );
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
    setInputData({ question: "" });
  };

  const typeWriterEffect = (text) => {
    let i = -1;
    setCurrentBotMessage("");

    const intervalId = setInterval(() => {
      setCurrentBotMessage((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "teacher bot", text },
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
          Please{" "}
          <Link to="/login" className="link-spacing">
            {" "}
            sign in{" "}
          </Link>{" "}
          to access the Virtual Teacher chat.
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
                <p className="txt">{message.text}</p>
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
                <p className="txt">Generating answer...</p>
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
              Tüs in AI can make mistakes, please check important information.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
