import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "How do I register as a student or a teacher on the platform?",
    answer: `To register, click on the "Sign up" button on the top navigation bar. Fill in your details and select "I am a student" if you are a student. Teachers will receive a referral link to share with students for easy class association.`,
  },
  {
    question:
      "What features are available for teachers to manage their classes?",
    answer: `Teachers can create student profiles, upload educational materials, generate quizzes, upload mock exams, and track student progress through the platform.`,
  },
  {
    question: "How do I upload educational materials for my students?",
    answer: `Teachers can upload materials by navigating to the "Educational Materials" section and clicking on the "Upload" button. Follow the prompts to select and upload your files.`,
  },
  {
    question:
      "How do I generate a referral link for my students to join my class?",
    answer: `After registering as a teacher, go to your profile settings. There you will find an option to generate a referral link, which you can share with your students.`,
  },
  {
    question:
      "What languages are supported by the platform for educational content?",
    answer: `The platform supports Kazakh, Russian, and English for educational content and the user interface.`,
  },
  {
    question:
      "Can I access and download educational materials for offline use?",
    answer: `Yes, educational materials can be viewed online or downloaded for offline use. Navigate to the "Educational Materials" section, and you will find options to view or download the files.`,
  },
  {
    question: "How do I use the AI virtual assistant for study help?",
    answer: `The AI virtual assistant can be accessed through the "Virtual Teacher" section. You can ask questions, seek help on specific topics, and get immediate responses.`,
  },
  {
    question:
      "How do I navigate to the forum to discuss topics with other users?",
    answer: `You can access the forum by clicking on the "Forum" link in the top navigation bar. From there, you can create new topics or participate in existing discussions.`,
  },
  {
    question:
      "How can I contact technical support if I encounter issues with the platform?",
    answer: `If you encounter issues with the platform, you can contact technical support by clicking on the "Help" or "Contact Us" link in the top navigation bar. This will direct you to a form where you can submit your issue or you can find the support email and phone number for immediate assistance.`,
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>FAQ's</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? "open" : ""}`}
              style={{ maxHeight: activeIndex === index ? "500px" : "0px" }}
            >
              <div className="faq-answer-content">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
