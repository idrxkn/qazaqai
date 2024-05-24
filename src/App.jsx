import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import EducationalMaterials from "./components/Pages/EducationalMaterials";
import Testing from "./components/Pages/Testing";
import Chat from "./components/Pages/Chat/Chat";
import Forum from "./components/Pages/Forum";
import AboutUs from "./components/Pages/AboutUs";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import "./fonts/fonts.css";
import "./i18n";

function App() {
  return (
    <>
      <Router>
        <div className="content">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route
                      path="/educational-materials"
                      element={<EducationalMaterials />}
                    />
                    <Route path="/testing" element={<Testing />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/about-us-help" element={<AboutUs />} />
                  </Routes>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
