import React from "react";
import "./Message.css";
import placeholderImage from "../../../assets/schoolboy.png";

const Message = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message-header">
        <img src={placeholderImage} alt="User" className="message-avatar" />
        <span className="message-username">{message.username}</span>
      </div>
      <p>{message.content}</p>
    </div>
  );
};

export default Message;
