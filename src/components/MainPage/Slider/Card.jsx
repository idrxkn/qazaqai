import React from "react";
import "./Card.css";
import green from "../../../assets/green.png";

const Card = ({ title, content, image }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
      </div>
      <img src={green} className="card-green-el" alt="" />
      {image}
    </div>
  );
};

export default Card;
