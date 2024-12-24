import React, { useState } from "react";
import "./EducationalMaterials.css";
import informatics5 from "../../../books/informatics_5.pdf";
import informatics2_5 from "../../../books/informatics2_5.pdf";
import informatics6 from "../../../books/informatics_6.pdf";
import informatics7 from "../../../books/informatics_7.pdf";
import informatics8 from "../../../books/informatics_8.pdf";
import informatics9 from "../../../books/informatics_9.pdf";
import informatics10 from "../../../books/informatics_10.pdf";
import informatics11 from "../../../books/informatics_11.pdf";

import Footer from "../../Footer/Footer";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faStar,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

const EducationalMaterials = () => {
  const { t } = useTranslation();

  // Static list of educational materials
  const [materials, setMaterials] = useState([
    {
      name: "Информатика Мухаметжанова С.Т. 5 сынып",
      path: informatics5,
    },
    {
      name: "Информатика Кадыркулов Р. 5 сынып",
      path: informatics2_5,
    },
    {
      name: "Информатика Салгараева Г.И.  6 сынып",
      path: informatics6,
    },
    {
      name: "Информатика Салгараева Г. 7 сынып",
      path: informatics7,
    },
    {
      name: "Информатика Мухаметжанова С.Т. 8 сынып",
      path: informatics8,
    },
    {
      name: "Информатика Кадыркулов Р. 9 сынып",
      path: informatics9,
    },
    {
      name: "Информатика Исабаева Д.Н. 10 сынып",
      path: informatics10,
    },
    {
      name: "Информатика Исабаева Д.Н. 11 сынып",
      path: informatics11,
    },
  ]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMaterial = {
        name: file.name,
        path: URL.createObjectURL(file),
      };
      setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    }
  };

  return (
    <>
      <div className="materials-container">
        <h1 className="edu-title">{t("edm.title")}</h1>
        <div className="materialss">
          <div className="filter-buttons">
            <button className={`access-btn public-btn active`}>
              {t("edm.public")}
            </button>
          </div>
          <div className="upload-section">
            <label htmlFor="file-upload" className="upload-btn">
              <FontAwesomeIcon icon={faFileUpload} />
              Оқулық жүктеу
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
          <div className="materials-grid">
            {materials.map((material, index) => (
              <div className="cardEdu" key={index}>
                <div className="overlay"></div>
                <div className="cardEdu-content">
                  <p>{material.name}</p>
                  <div className="edu-buttons">
                    <a
                      href={material.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="view">
                        <FontAwesomeIcon icon="fa-solid fa-eye" />{" "}
                        {t("edm.view")}
                      </button>
                    </a>
                    <a href={material.path} download={material.name}>
                      <button className="download">
                        {" "}
                        <FontAwesomeIcon icon="fa-solid fa-download" />{" "}
                        {t("edm.download")}
                      </button>
                    </a>
                  </div>
                </div>
                <FontAwesomeIcon icon={faStar} className="icon-star" />
                <div className="bottom-icons">
                  <FontAwesomeIcon icon={faSchool} className="icon-school" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EducationalMaterials;
