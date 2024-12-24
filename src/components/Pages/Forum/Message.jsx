// /src/components/Message.js

import React from "react";
import "./Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message-header">
        <div className="message-avatar">
          <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className="fs-c" />
        </div>{" "}
        <span className="message-username">{message.username}</span>
      </div>
      <p>{message.content}</p>
    </div>
  );
};

export default Message;
