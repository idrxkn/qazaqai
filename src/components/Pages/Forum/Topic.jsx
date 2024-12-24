// /src/components/Topic.js

import React, { useState, useEffect } from "react";
import Message from "./Message";
import { fetchUserData } from "../../../api";
import "./Topic.css";

const Topic = ({ topic }) => {
  const [newMessageContent, setNewMessageContent] = useState("");
  const [messages, setMessages] = useState(topic.messages);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUsername(data.userName);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    getUserData();
  }, []);

  const handleAddMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      id: messages.length + 1,
      content: newMessageContent,
      username: username,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setNewMessageContent("");

    const updatedTopic = { ...topic, messages: updatedMessages };
    const storedTopics = JSON.parse(localStorage.getItem("topics"));
    const updatedTopics = storedTopics.map((t) =>
      t.id === topic.id ? updatedTopic : t
    );
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
  };

  return (
    <div className="topic-container">
      <h3>Topic title: {topic.title}</h3>
      <p>Content: {topic.content}</p>
      <p className="topic-creator">Created by: {topic.creator}</p>
      <div className="messages-list">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleAddMessage} className="new-message-form">
        <input
          type="text"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          placeholder="New Message"
          required
        />
        <button className="addmes" type="submit">
          Add Message
        </button>
      </form>
    </div>
  );
};

export default Topic;
