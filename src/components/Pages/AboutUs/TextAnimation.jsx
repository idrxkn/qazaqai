import React, { useEffect, useState } from "react";
import "./TextAnimation.css";

const TextAnimation = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  // Updated words to Kazakh phrases that are understandable in context
  const words = ["БІЛІМ ЖОЛЫНДА", "ОҚУ ИГІЛІГІНЕ", "ҚАЗАҚСТАНҒА"];
  const typingSpeed = 100;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    const typeWriter = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      } else {
        if (charIndex < currentWord.length) {
          setDisplayedText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    if (startTyping) {
      const timeout = setTimeout(
        typeWriter,
        isDeleting ? deletingSpeed : typingSpeed
      );
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isDeleting, wordIndex, startTyping, words]);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      document.getElementById("we").classList.add("visible");
      setTimeout(() => {
        document.getElementById("serve").classList.add("visible");
        setTimeout(() => setStartTyping(true), 500);
      }, 500);
    }, 500);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div className="container">
      {/* "We" -> "Біз" */}
      <h1 id="we" className="hidden">
        БІЗ
      </h1>
      {/* "serve" -> "қызмет етеміз" */}
      <h1 id="serve" className="hidden">
        ҚЫЗМЕТ ЕТЕМІЗ
      </h1>
      <div id="text-container">
        <h1 id="dynamic-text">{displayedText}</h1>
      </div>
    </div>
  );
};

export default TextAnimation;
