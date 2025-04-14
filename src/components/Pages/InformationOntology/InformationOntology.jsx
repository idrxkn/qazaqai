import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./InformationOntology.css";

const InformationOntologyZ = () => {
  const [owlText, setOwlText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    fetch("/информатикакітаптарі.owl")
      .then((res) => res.text())
      .then((data) => setOwlText(data))
      .catch((err) =>
        console.error("информатикакітаптарі.owl файлын жүктеу қате:", err)
      );
  }, []);

  if (!isAuthenticated) {
    return (
      <p className="please-signin">
        Өтініш, инфрорматика онтологиясына кіру үшін{" "}
        <Link to="/login" className="link-spacing">
          тіркеліңіз
        </Link>
      </p>
    );
  }
  return (
    <div className="ontology-wrapper">
      <header className="ontology-header">
        <h1 className="ontology-title">Ақпараттық онтология</h1>
        <p className="ontology-subtitle">Барлық ресурстар мен сілтемелер</p>
      </header>

      <section className="ontology-link-container">
        <a
          href="https://termin2.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="ontology-external-link"
        >
          🌐 Сілтеме бойынша терминдерді іздеу
        </a>
      </section>

      <section className="ontology-owl-section">
        <div className="ontology-owl-header">
          <h3>📄 информатикакітаптарі.owl</h3>
          <a
            href="/информатикакітаптарі.owl"
            download
            className="ontology-download-btn"
          >
            OWL файлды жүктеу
          </a>
        </div>

        {/* 👉 Explanation */}
        <p className="ontology-description">
          Бұл <strong>информатикакітаптарі.owl</strong> файлы — информатика
          пәніне байланысты терминдер мен түсініктердің онтологиясы. Онтология
          RDF/OWL форматында ұсынылған және семантикалық веб-технологиялар
          арқылы құрылымдық мәліметтермен жұмыс істеуге арналған.
        </p>

        <button
          className="ontology-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Мазмұнды жасыру ▲" : "Мазмұнды көрсету ▼"}
        </button>

        {isExpanded && (
          <pre className="ontology-owl-code">
            <code>{owlText}</code>
          </pre>
        )}
      </section>
    </div>
  );
};

export default InformationOntologyZ;
