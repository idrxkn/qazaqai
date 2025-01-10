import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Testing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../context/AuthContext";

const Testing = () => {
  const [customTests, setCustomTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [committedAnswers, setCommittedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerSaved, setAnswerSaved] = useState(false);
  const { userRole } = useAuth();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          "https://qaz-b-production.up.railway.app/api/tests"
        );
        setCustomTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const startTest = async (testId) => {
    try {
      const response = await axios.get(
        `https://qaz-b-production.up.railway.app/api/tests/${testId}`
      );
      setSelectedTest(response.data);
      setShowTest(true);
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setCommittedAnswers([]);
      setAnswerSaved(false);
    } catch (error) {
      console.error("Failed to fetch test:", error);
      alert("Тесті жүктеу кезінде қате орын алды.");
    }
  };

  const handleAnswerOptionClick = (index) => {
    const isCorrect =
      index === selectedTest.questions[currentQuestion]?.correctIndex;

    setCommittedAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestion] = {
        question: selectedTest.questions[currentQuestion]?.question || "",
        subtopic:
          selectedTest.questions[currentQuestion]?.subtopic || "Тақырыпша жоқ",
        isCorrect,
      };
      return updatedAnswers;
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswerSaved(true);
    setTimeout(() => setAnswerSaved(false), 1500);

    setTimeout(() => {
      if (currentQuestion + 1 < selectedTest.questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setAnswerSaved(false);
      } else {
        setShowScore(true);
        saveResults();
      }
    }, 1000);
  };

  const handleBackQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setAnswerSaved(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswerSaved(false);
    } else if (currentQuestion === selectedTest.questions.length - 1) {
      setShowScore(true);
      saveResults();
    }
  };

  const saveResults = async () => {
    const wrongAnswers = committedAnswers.filter(
      (ans) => ans && !ans.isCorrect
    );
    const resultData = {
      testName: selectedTest.testName,
      testTopic: selectedTest.testTopic,
      totalQuestions: selectedTest.questions.length,
      rightAnswersCount: score,
      wrongAnswersCount: wrongAnswers.length,
      subTopics: wrongAnswers.map((ans) => ans.subtopic),
    };

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://qaz-b-production.up.railway.app/api/test-results",
        resultData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Results saved successfully.");
    } catch (error) {
      console.error("Failed to save results:", error);
      alert("Нәтижелерді сақтау кезінде қате орын алды.");
    }
  };

  const handleBackToList = () => {
    setShowTest(false);
    setSelectedTest(null);
  };

  const deleteTest = async (testId, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!window.confirm("Сіз бұл тестті жоюға сенімдісіз бе?")) {
      return;
    }

    try {
      await axios.delete(
        `https://qaz-b-production.up.railway.app/api/tests/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomTests((prevTests) =>
        prevTests.filter((test) => test.id !== testId)
      );
      alert("Тест сәтті жойылды!");
    } catch (error) {
      console.error("Failed to delete test:", error);
      alert("Тесті жою кезінде қате орын алды.");
    }
  };
  if (!isAuthenticated) {
    return (
      <>
        <p className="please-signin">
          Өтініш, тестілеуге кіру үшін{" "}
          <Link to="/login" className="link-spacing">
            {" "}
            тіркеліңіз{" "}
          </Link>{" "}
        </p>
      </>
    );
  }
  return (
    <div className="test-container">
      {!showTest ? (
        <>
          <h1 className="test-title">Тест тізімі:</h1>
          <div className="testing-btn">
            {userRole === "Teacher" ? (
              <Link to="/create-test">
                <button className="create-test-btn">
                  <FontAwesomeIcon icon="fa-solid fa-plus" /> Жаңа тест құру
                </button>
              </Link>
            ) : (
              ""
            )}
            <Link to="/chat-asker">
              <button className="create-test-btn">
                <FontAwesomeIcon icon="fa-solid fa-robot" /> Жасанды
                интеллекттің тестін өту
              </button>
            </Link>
          </div>

          {loading ? (
            <p>Жүктелуде...</p>
          ) : (
            <div className="test-grid">
              {customTests.length === 0 ? (
                <p style={{ fontFamily: "Monolog" }}>
                  Қазіргі уақытта тесттер жоқ.
                </p>
              ) : (
                customTests.map((test) => (
                  <div className="cardTest-two">
                    <div
                      key={test.id}
                      className="cardTest"
                      onClick={() => startTest(test.id)}
                    >
                      <div className="overlay-test"></div>
                      <div className="cardTest-content">
                        <h3>{test.testName}</h3>
                        <p>Тақырыбы: {test.testTopic}</p>
                        <p>{test.questions.length} сұрақ(тар)</p>
                      </div>
                      <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
                    </div>
                    {userRole === "Teacher" && (
                      <button
                        className="delete-test-btn"
                        onClick={(e) => deleteTest(test.id, e)}
                      >
                        Тестті жою
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {showScore ? (
            <div className="score-section">
              <p>
                Сіздің нәтижеңіз: {score} / {selectedTest.questions.length}
              </p>
              <button className="back-btn" onClick={handleBackToList}>
                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />{" "}
                Тесттер тізіміне оралу
              </button>
            </div>
          ) : (
            <div className="question-section">
              <h1>{selectedTest.testName}</h1>
              <p className="test-topic">
                Тесттің тақырыбы: {selectedTest.testTopic}
              </p>
              <p className="question-number">
                Сұрақ {currentQuestion + 1} / {selectedTest.questions.length}
              </p>
              {answerSaved && (
                <div className="answer-saved-message-block">
                  <p className="answer-saved-message">Жауап сақталды!</p>
                </div>
              )}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / selectedTest.questions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              {selectedTest.questions[currentQuestion] ? (
                <>
                  <div className="question-text">
                    {selectedTest.questions[currentQuestion].question}
                  </div>
                  <div className="answer-section">
                    {selectedTest.questions[currentQuestion].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          className="option-button"
                          onClick={() => handleAnswerOptionClick(index)}
                        >
                          {["А", "В", "С", "D"][index]}. {option}
                        </button>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p>Сұрақты жүктеу кезінде қате орын алды.</p>
              )}
              <div className="navigation-buttons">
                <button
                  className="back-btn"
                  onClick={handleBackQuestion}
                  disabled={currentQuestion === 0}
                >
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Артқа
                </button>
                <button className="back-btn" onClick={handleNextQuestion}>
                  Келесі <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                </button>
              </div>
              <div className="navigation-blocks">
                {selectedTest.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`navigation-block ${
                      index === currentQuestion
                        ? "current-question"
                        : committedAnswers[index]
                        ? "answered-question"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Testing;
