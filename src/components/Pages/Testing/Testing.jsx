import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Testing.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Footer/Footer";
import eng1 from "./eng1";
import eng2 from "./eng2";
import eng3 from "./eng3";
import rus1 from "./rus1";
import rus2 from "./rus2";
import rus3 from "./rus3";
import kaz1 from "./kaz1";
import kaz2 from "./kaz2";
import kaz3 from "./kaz3";
import { useTranslation } from "react-i18next";

const Testing = () => {
  const { isAuthenticated } = useAuth();
  const { i18n } = useTranslation();
  const [testIndex, setTestIndex] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showCorrectionTest, setShowCorrectionTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [correctionTestTitle, setCorrectionTestTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (showTest) {
      if (showCorrectionTest) {
        const correctionQuestions = getCorrectionTestQuestions();
        if (correctionQuestions.length === 0) {
          alert("No correction questions found.");
        }
        setQuestions(correctionQuestions);
      } else {
        const allQuestions = getQuestions();
        setQuestions(allQuestions[testIndex]);
      }
    }
  }, [showTest, showCorrectionTest, testIndex, i18n.language]);

  const getQuestions = () => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "en") {
      return [eng1, eng2, eng3];
    } else if (currentLanguage === "ru") {
      return [rus1, rus2, rus3];
    } else {
      return [kaz1, kaz2, kaz3];
    }
  };

  const getCorrectionTestQuestions = () => {
    const currentLanguage = i18n.language;
    const incorrectKey = `incorrectAnswers_${currentLanguage}_${testIndex}`;
    const correctionQuestions =
      JSON.parse(localStorage.getItem(incorrectKey)) || [];
    console.log("Correction questions retrieved:", correctionQuestions); // Debug log
    return correctionQuestions;
  };

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = questions[currentQuestion].answers.find(
      (answer) => answer.correct === "true"
    ).text;
    if (option === correctAnswer) {
      setScore(score + 1);
    } else {
      saveIncorrectAnswer(questions[currentQuestion]);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
      if (showCorrectionTest) {
        clearCorrectionTestQuestions();
      }
    }
  };

  const saveIncorrectAnswer = (question) => {
    const currentLanguage = i18n.language;
    const incorrectKey = `incorrectAnswers_${currentLanguage}_${testIndex}`;
    let incorrectAnswers = JSON.parse(localStorage.getItem(incorrectKey)) || [];
    incorrectAnswers.push(question);
    localStorage.setItem(incorrectKey, JSON.stringify(incorrectAnswers));
  };

  const clearCorrectionTestQuestions = () => {
    const currentLanguage = i18n.language;
    const incorrectKey = `incorrectAnswers_${currentLanguage}_${testIndex}`;
    localStorage.removeItem(incorrectKey);
    console.log(`Cleared correction questions for ${incorrectKey}`);
  };

  const handleBackButtonClick = () => {
    setShowTest(false);
    setShowCorrectionTest(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setShowScore(false);
    setQuestions([]);
  };

  const optionLabels = ["A", "B", "C", "D", "E"];

  const hasIncorrectAnswers = () => {
    const currentLanguage = i18n.language;
    for (let i = 0; i < 3; i++) {
      const incorrectKey = `incorrectAnswers_${currentLanguage}_${i}`;
      if (localStorage.getItem(incorrectKey)) {
        return true;
      }
    }
    return false;
  };

  const handleCorrectionTestClick = (index, title) => {
    setTestIndex(index);
    setCorrectionTestTitle(title);
    setShowCorrectionTest(true);
    setShowTest(true);
  };

  if (!isAuthenticated) {
    return (
      <p className="please-signin">
        Please{" "}
        <Link to="/login" className="link-spacing">
          {" "}
          sign in{" "}
        </Link>{" "}
        to access the testing.
      </p>
    );
  }

  return (
    <>
      <div className="test-container">
        <h1 className="test-title">Test lists:</h1>

        {!showTest ? (
          <>
            <div className="test-grid">
              <div
                className="cardTest"
                onClick={() => {
                  setTestIndex(0);
                  setShowTest(true);
                  setShowCorrectionTest(false);
                }}
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Informatics Test</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </div>
              <div
                className="cardTest"
                onClick={() => {
                  setTestIndex(1);
                  setShowTest(true);
                  setShowCorrectionTest(false);
                }}
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Algorithms test</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </div>
              <div
                className="cardTest"
                onClick={() => {
                  setTestIndex(2);
                  setShowTest(true);
                  setShowCorrectionTest(false);
                }}
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Programming practice test</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </div>
              {hasIncorrectAnswers() && (
                <div
                  className="cardTest"
                  onClick={() =>
                    handleCorrectionTestClick(testIndex, "Correction Test")
                  }
                >
                  <div className="overlay-test"></div>
                  <div className="cardTest-content">
                    <h3>Correction Test</h3>
                    <p>Click to start the correction test</p>
                  </div>
                  <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h1>
              {showCorrectionTest
                ? correctionTestTitle
                : [
                    "Informatics Test",
                    "Algorithms Test",
                    "Programming practice test",
                  ][testIndex]}
            </h1>
            {showScore ? (
              <div className="score-section">
                <p>
                  You scored {score} out of {questions.length}
                </p>
                <button className="back-btn" onClick={handleBackButtonClick}>
                  Back
                </button>
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.length}
                  </div>
                  <div className="question-text">
                    {questions[currentQuestion]?.question || ""}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${
                          ((currentQuestion + 1) / (questions.length || 1)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion]?.answers?.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        selectedOption === option.text ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption(option.text);
                        handleAnswerOptionClick(option.text);
                      }}
                    >
                      {optionLabels[index]}. {option.text}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Testing;
