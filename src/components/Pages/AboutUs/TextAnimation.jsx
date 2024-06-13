import React, { useEffect, useState } from "react";
import "./TextAnimation.css";

const TextAnimation = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  const words = ["for education", "schools", "for Kazakhstan"];
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
  }, [charIndex, isDeleting, wordIndex, startTyping]);

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
      <h1 id="we" className="hidden">
        We
      </h1>
      <h1 id="serve" className="hidden">
        serve
      </h1>
      <div id="text-container">
        <h1 id="dynamic-text">{displayedText}</h1>
      </div>
    </div>
  );
};

export default TextAnimation;
