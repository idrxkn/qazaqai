import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import "./EducationalMaterials.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Footer/Footer";
// List of PDF file names
const pdfFiles = [
  "history9.pdf",
  "info1.pdf",
  "info3.pdf",
  "info5.pdf",
  "info6.pdf",
  "info7.pdf",
  "info8.pdf",
  "info9.pdf",
  "info10.pdf",
  "info11.pdf",
  "ubt1.pdf",
  "ubt2.pdf",
  "ubt3.pdf",
];
const pdfNames = [
  "History 9th grade",
  "Informatics 1 grade",
  "Informatics 3 grade",
  "Informatics 5 grade",
  "Informatics 6 grade",
  "Informatics 7 grade",
  "Informatics 8 grade",
  "Informatics 9 grade",
  "Informatics 10 grade",
  "Informatics 11 grade",
  "ubt1.pdf",
  "ubt2.pdf",
  "ubt3.pdf",
];

const EducationalMaterials = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <>
      <div className="materials-container">
        <h1 className="edu-title">Educational Materials</h1>
        <div className="materials-grid">
          {pdfFiles.map((file, index) => (
            <div className="cardEdu" key={index}>
              <div className="overlay"></div>
              <div className="cardEdu-content">
                <p>{pdfNames[index]}</p>

                <div className="edu-buttons">
                  <button
                    className="view"
                    onClick={() => setSelectedPdf(`/materials/${file}`)}
                  >
                    View
                  </button>
                  <a href={`/materials/${file}`} download={file}>
                    <button className="download">Download</button>
                  </a>
                </div>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-star" />
              <div className="bottom-icons">
                <FontAwesomeIcon icon="fa-solid fa-school" />
              </div>
            </div>
          ))}
        </div>
        {selectedPdf && (
          <div className="pdf-viewer-container">
            <h2>Viewing: {selectedPdf.split("/").pop()}</h2>
            <PdfViewer file={selectedPdf} />
            <button onClick={() => setSelectedPdf(null)}>Close</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EducationalMaterials;
