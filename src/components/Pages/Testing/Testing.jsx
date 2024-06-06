import React, { useState } from "react";
import questions from "./questions"; // Import the questions
import "./Testing.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Footer/Footer";

const Testing = () => {
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
    }
  };

  const handleBackButtonClick = () => {
    setShowTest(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setShowScore(false);
  };

  const optionLabels = ["A", "B", "C", "D", "E"];

  return (
    <>
      <div className="test-container">
        <h1 className="test-title">Test lists:</h1>

        {!showTest ? (
          <>
            <div className="test-grid">
              <div className="cardTest" onClick={() => setShowTest(true)}>
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Informatics Test</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </div>
              <a
                href="https://quizgecko.com/discover/pets/kazakhstan-history"
                target="_blank"
                rel="noopener noreferrer"
                className="cardTest"
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>History of Kazakhstan test collection</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </a>
              <a
                href="https://testyourlanguage.com/start-quiz?tid=WFy378&language=Kazakh%20Vocabulary%20Quiz"
                target="_blank"
                rel="noopener noreferrer"
                className="cardTest"
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Kazakh language test</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </a>
              <a
                href="https://www.varsitytutors.com/computer_science-practice-tests"
                target="_blank"
                rel="noopener noreferrer"
                className="cardTest"
              >
                <div className="overlay-test"></div>
                <div className="cardTest-content">
                  <h3>Computer Science test collection</h3>
                  <p>Click to start the test</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-person-circle-question" />
              </a>
            </div>
          </>
        ) : (
          <>
            <h1>Informatics general test</h1>
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
                    {questions[currentQuestion].question}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${
                          ((currentQuestion + 1) / questions.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        selectedOption === option ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption(option);
                        handleAnswerOptionClick(option);
                      }}
                    >
                      {optionLabels[index]}. {option}
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
