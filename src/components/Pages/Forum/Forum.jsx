import React, { useState, useEffect } from "react";
import Topic from "./Topic";
import "./Forum.css";
import { fetchUserData } from "../../../api";
import Footer from "../../Footer/Footer";

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
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

  const handleCreateTopic = (e) => {
    e.preventDefault();
    const newTopic = {
      id: topics.length + 1,
      title: newTopicTitle,
      content: newTopicContent,
      creator: username,
      messages: [],
    };
    setTopics([...topics, newTopic]);
    setNewTopicTitle("");
    setNewTopicContent("");
  };

  return (
    <>
      <div className="forum-container">
        <h1>Forum</h1>
        <form onSubmit={handleCreateTopic} className="new-topic-form">
          <h2>Create New Topic</h2>
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="Topic Title"
            required
          />
          <textarea
            value={newTopicContent}
            onChange={(e) => setNewTopicContent(e.target.value)}
            placeholder="Topic Content"
            required
          ></textarea>
          <button type="submit">Create Topic</button>
        </form>
        <div className="topics-list">
          {topics.map((topic) => (
            <Topic key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forum;
