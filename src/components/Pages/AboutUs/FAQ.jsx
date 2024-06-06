import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "How can AI improve education in schools?",
    answer:
      "AI can personalize learning, provide intelligent tutoring, automate administrative tasks, and enhance engagement through interactive tools.",
  },
  {
    question: "What are the benefits of learning Kazakh language?",
    answer:
      "Learning Kazakh helps in understanding the culture, enhances cognitive abilities, and opens up opportunities for communication within Kazakhstan.",
  },
  {
    question: "How can AI be used in Kazakh language education?",
    answer:
      "AI can provide language learning apps, pronunciation guides, automated grading, and personalized feedback to help learners improve their Kazakh language skills.",
  },
  {
    question: "What projects are you working on related to AI and education?",
    answer:
      "We are developing AI-powered tools to assist in language learning, creating interactive educational platforms, and exploring AI applications in various subjects.",
  },
  {
    question: "How can students benefit from AI in their studies?",
    answer:
      "Students can benefit from personalized learning experiences, immediate feedback, enhanced engagement, and access to a wealth of knowledge through AI-driven tools.",
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
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
