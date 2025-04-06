import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTest.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateTest = () => {
  const navigate = useNavigate();
  const [testName, setTestName] = useState("");
  const [testTopic, setTestTopic] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctIndex: null,
      subtopic: "",
    },
  ]);

  const addQuestion = () => {
    if (questions.length < 20) {
      setQuestions([
        ...questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctIndex: null,
          subtopic: "",
        },
      ]);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question" || field === "subtopic") {
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctIndex = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (
      !testName ||
      !testTopic ||
      questions.some((q) => !q.question || q.correctIndex === null)
    ) {
      alert("Барлық қажетті өрістерді толтырыңыз.");
      return;
    }

    const newTest = {
      testName,
      testTopic,
      questions,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const response = await axios.post(
        "https://qazaqai-api-production.up.railway.app/api/tests",
        newTest,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );
      alert("Тест сәтті құрылды!");
      navigate("/testing");
    } catch (error) {
      console.error("Тестті жүктеу қатесі:", error);
      alert("Тестті жүктеу кезінде қате орын алды. Қайталап көріңіз.");
    }
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="create-test-container">
      <button className="back-btn" onClick={() => navigate("/testing")}>
        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Артқа
      </button>
      <h1>Жаңа тест құру</h1>
      <div className="form-section">
        <label className="label-create-test">
          Тест атауы (Міндетті):
          <input
            className="input-create-test"
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Тест атауын енгізіңіз"
          />
        </label>
        <label className="label-create-test">
          Тест тақырыбы (Міндетті):
          <input
            className="input-create-test"
            type="text"
            value={testTopic}
            onChange={(e) => setTestTopic(e.target.value)}
            placeholder="Тест тақырыбын енгізіңіз"
          />
        </label>
      </div>
      {questions.map((q, index) => (
        <div key={index} className="question-card">
          <h3>{index + 1} – сұрақ</h3>
          <input
            className="input-create-test"
            type="text"
            value={q.question}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
            placeholder="Сұрақты енгізіңіз"
          />
          <label className="label-create-test">
            Тақырыпша (Қосымша):
            <input
              className="input-create-test"
              type="text"
              value={q.subtopic}
              onChange={(e) =>
                handleQuestionChange(index, "subtopic", e.target.value)
              }
              placeholder="Тақырыпшаны енгізіңіз (қосымша)"
            />
          </label>
          <div className="options-container">
            {["А", "В", "С", "D"].map((option, i) => (
              <div key={i} className="option">
                <label className="label-create-test">
                  {option}:
                  <input
                    className="input-create-test"
                    type="text"
                    value={q.options[i]}
                    onChange={(e) =>
                      handleQuestionChange(index, i, e.target.value)
                    }
                    placeholder={`${option} нұсқасын енгізіңіз`}
                  />
                </label>
                <div className="right-answer">
                  <input
                    type="radio"
                    id={`correct-option-${index}-${i}`}
                    name={`correct-option-${index}`}
                    checked={q.correctIndex === i}
                    onChange={() => handleCorrectOptionChange(index, i)}
                  />
                  <label htmlFor={`correct-option-${index}-${i}`}>Дұрыс</label>
                </div>
              </div>
            ))}
          </div>
          <button className="delete-btn" onClick={() => deleteQuestion(index)}>
            <FontAwesomeIcon icon="fa-solid fa-trash" /> Сұрақты жою
          </button>
        </div>
      ))}
      {questions.length < 20 && (
        <button className="add-btn" onClick={addQuestion}>
          <FontAwesomeIcon icon="fa-solid fa-plus" /> Сұрақ қосу
        </button>
      )}
      <button className="submit-btn" onClick={handleSubmit}>
        Тестті сақтау
      </button>
    </div>
  );
};

export default CreateTest;
