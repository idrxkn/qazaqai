import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PdfViewer from "./PdfViewer";
import DocViewer from "./DocViewerComponent";
import "./EducationalMaterials.css"; // Import the CSS file
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Footer/Footer";
import { useTranslation } from "react-i18next";

const BASE_URL = "http://localhost:10000/api/materials"; // Adjust base URL accordingly

const EducationalMaterials = () => {
  const { isAuthenticated, decodedTokenRole } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [accessLevel, setAccessLevel] = useState("Public");
  const [materials, setMaterials] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [filter, setFilter] = useState("Public");
  const { i18n, t } = useTranslation();
  const fileInputRef = useRef(null);

  const isActive = (buttonType) => {
    return filter === buttonType ? "active" : "";
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMaterials();
    }
  }, [isAuthenticated]);

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAccessLevelChange = (e) => {
    setAccessLevel(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("accessLevel", accessLevel);

    try {
      const token = localStorage.getItem("token");
      await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadError(null);
      fetchMaterials(); // Refresh the materials list after upload
      setUploadMode(false); // Switch back to materials grid after successful upload
    } catch (error) {
      setUploadError("Failed to upload material. Please try again.");
      console.error("Error uploading material:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const filteredMaterials = materials.filter(
    (material) => material.accessLevel === filter
  );

  if (!isAuthenticated) {
    return (
      <p className="please-signin">
        Please{" "}
        <Link to="/login" className="link-spacing">
          sign in
        </Link>{" "}
        to access the educational materials.
      </p>
    );
  }

  return (
    <>
      <div className="materials-container">
        <h1 className="edu-title">{t("edm.title")}</h1>
        {decodedTokenRole === "Teacher" && !uploadMode && (
          <button onClick={() => setUploadMode(true)} className="upload-btn">
            {t("edm.updmat")}
          </button>
        )}
        {uploadMode ? (
          <div>
            <form onSubmit={handleUpload} className="upload-form">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="drag-drop-area"
                onClick={handleBrowseClick}
              >
                <FontAwesomeIcon
                  icon={faFileUpload}
                  size="3x"
                  style={{ fontSize: 64 }}
                />
                <p className="drag-p">
                  {t("edm.drg")}{" "}
                  <span className="browse">{t("edm.browse")}</span>
                </p>
                {file && (
                  <p>
                    {t("edm.fl")} {file.name}
                  </p>
                )}
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="file-btn"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                placeholder={t("edm.category")}
                required
                className="ctg-btn"
              />
              <select
                value={accessLevel}
                onChange={handleAccessLevelChange}
                className="access-select"
              >
                <option value="Public">{t("edm.public")}</option>
                <option value="Private">{t("edm.private")}</option>
              </select>
              <button type="submit" className="upload-last-btn">
                {t("edm.upd")}
              </button>
              {uploadError && <p className="error-message">{uploadError}</p>}
            </form>
            <button
              onClick={() => setUploadMode(false)}
              className="back-to-mat"
            >
              {t("edm.back")}
            </button>
          </div>
        ) : (
          <div className="materialss">
            <div className="filter-buttons">
              <button
                onClick={() => setFilter("Public")}
                className={`access-btn public-btn ${isActive("Public")}`}
              >
                {t("edm.public")}
              </button>
              <button
                onClick={() => setFilter("Private")}
                className={`access-btn private-btn ${isActive("Private")}`}
              >
                {t("edm.private")}
              </button>
            </div>
            <div className="materials-grid">
              {filteredMaterials.map((material, index) => (
                <div className="cardEdu" key={index}>
                  <div className="overlay"></div>
                  <div className="cardEdu-content">
                    <p>
                      {material.name} ({material.category})
                    </p>
                    <div className="edu-buttons">
                      <button
                        className="view"
                        onClick={() => handleViewFile(material)}
                      >
                        {t("edm.view")}
                      </button>
                      <a
                        href={`${BASE_URL}/${material.id}`}
                        download={material.name}
                      >
                        <button className="download">
                          {t("edm.download")}
                        </button>
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
          </div>
        )}
        {selectedFile && (
          <div className="file-viewer-container">
            <h2>Viewing: {selectedFile.name}</h2>
            {selectedFile.name.endsWith(".pdf") ? (
              <PdfViewer file={`/materials/${selectedFile.name}`} />
            ) : (
              <DocViewer file={`/materials/${selectedFile.name}`} />
            )}
            <button onClick={() => setSelectedFile(null)}>Close</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EducationalMaterials;
