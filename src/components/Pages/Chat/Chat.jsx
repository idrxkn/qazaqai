// Chat.js
import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logo.svg";
import teacherIcon from "../../../assets/teachersx.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({ question: "" });
  const messageEnd = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    messageEnd.current.scrollIntoView();
  }, [messages]);

  const handleSubmit = async () => {
    if (inputData.question.trim() === "") return;

    const userMessage = { type: "user", text: inputData.question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    const currentLanguage = i18n.language;
    console.log("Current Language:", currentLanguage); // Debugging line
    const apiUrl =
      currentLanguage === "ru"
        ? "http://127.0.0.1:8001/get-answer"
        : "http://127.0.0.1:8000/ask";
    console.log("API URL:", apiUrl); // Debugging line

    try {
      const response = await axios.post(
        apiUrl,
        { question: inputData.question },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = {
        type: "teacher bot",
        text: response.data.answer,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const botMessage = {
        type: "teacher bot",
        text: `Could not retrieve data for ${inputData.question}. Please try something new.`,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.error("API Error:", error); // Debugging line
    } finally {
      setLoading(false);
    }
    setInputData({ question: "" });
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSubmit();
  };

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
                <FontAwesomeIcon icon="fa-solid fa-plus" /> New chat
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
                <FontAwesomeIcon icon="fa-solid fa-door-open" /> Home
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
                placeholder="Hey, send a message"
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
