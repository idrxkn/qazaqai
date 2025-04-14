import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./components/Header/Header";
import EducationalMaterials from "./components/Pages/EducationalMaterials/EducationalMaterials";
import Testing from "./components/Pages/Testing/Testing";
import InformationOntology from "./components/Pages/InformationOntology/InformationOntology";
import CreateTest from "./components/Pages/Testing/CreateTest";
import ChatAsker from "./components/Pages/ChatAsker/ChatAsker";
import Chat from "./components/Pages/Chat/Chat";
import Forum from "./components/Pages/Forum/Forum";
import AboutUs from "./components/Pages/AboutUs/AboutUs";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import MainPage from "./components/MainPage/MainPage";
import MyProfile from "./components/MyProfile/MyProfile";
import Footer from "./components/Footer/Footer";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import "./fonts/fonts.css";
import "./i18n";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <AuthProvider>
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
                      <Route path="/create-test" element={<CreateTest />} />
                      <Route
                        path="/infontology"
                        element={<InformationOntology />}
                      />
                      <Route path="/forum" element={<Forum />} />
                      <Route path="/about-us-help" element={<AboutUs />} />
                      <Route path="/myprofile" element={<MyProfile />} />
                      <Route path="/chat-asker" element={<ChatAsker />} />
                    </Routes>
                  </>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
library.add(fab, fas, far);
