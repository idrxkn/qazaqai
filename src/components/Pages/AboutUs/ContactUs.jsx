import React, { useState } from "react";
import axios from "axios";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const CHAT_ID = "-1002191615495";
    const URI_API = `https://api.telegram.org/bot7398043126:AAGLg6ZvAxGGzmFfJTRrpVrgaQgqpqu5R3c/sendMessage`;

    const telegramMessage = `<b>Поступило сообщение с веб-сайта Tüs In</b>\n<b>Имя: </b>${formData.name}\n<b>Почта: </b>${formData.email}\n<b>Сообщение: </b>${formData.message}`;

    const payload = {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: telegramMessage,
    };

    console.log("Sending payload:", payload);

    axios
      .post(URI_API, payload)
      .then((res) => {
        console.log("Response:", res.data);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
      })
      .finally(() => {
        console.log("Everything is finished");
      });
  };

  return (
    <div className="form-container">
      <h1>Contact Us</h1>
      <p>
        Do you have any questions or suggestions? Or maybe you want to
        collaborate?
      </p>
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
