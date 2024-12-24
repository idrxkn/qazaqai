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

        <Profiles />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
