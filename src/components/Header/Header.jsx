import React from "react";
import Logo from "./Logo";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
