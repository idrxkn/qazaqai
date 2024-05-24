import React from "react";
import logo from "../../assets/logo.svg";
import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div alt="Tüs In Logo" className="logo" />
    </Link>
  );
};

export default Logo;
