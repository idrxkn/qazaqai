import React from "react";
import "./AboutUs.css";
import FAQ from "./FAQ";
import TextAnimation from "./TextAnimation";
import ContactUs from "./ContactUs";
import Profiles from "./Profiles";
import Footer from "../../Footer/Footer";
import curve from "../../../assets/curve.svg";
import aitu from "../../../assets/aitu.jpg";
import aitu2 from "../../../assets/aitu2.jpg";
import aitu3 from "../../../assets/aitu3.jpg";
import aitu4 from "../../../assets/aitu4.jpg";

const AboutUs = () => {
  const images = [aitu2, aitu4, aitu3, aitu];
  return (
    <>
      <div className="aboutus-wrap">
        <div className="aboutus-top">
          <TextAnimation />
          <div className="curve-img"></div>
        </div>

        <div className="imgbig-container">
          <div className="image-grid">
            {images.map((image, index) => (
              <div className={`image-item image-item-${index + 1}`} key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="img-text-container">
            <h1>
              Through the Power of University. <br />{" "}
              <p className="img-text-p">
                We are from Astana IT University, aspiring developers that are
                seeking educational fulfillment in KZ.
              </p>
            </h1>

            <button>
              {" "}
              <a href="https://astanait.edu.kz/">Try our uni website :) </a>
            </button>
          </div>
        </div>
        <Profiles />
        <FAQ />

        <ContactUs />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
