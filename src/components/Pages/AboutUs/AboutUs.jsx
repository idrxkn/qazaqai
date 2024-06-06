import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus-header">
          <h1>About Us</h1>
        </div>
        <div className="aboutus-body">
          <img
            src="path/to/your/image.jpg"
            alt="About Us"
            className="aboutus-image"
          />
          <div className="aboutus-text">
            <p>
              We are a group of three students from Astana IT University,
              majoring in Software Engineering. Our team is passionate about
              leveraging technology to solve real-world problems and making a
              significant impact in the field of software development.
            </p>
            <p>
              Our journey started with a shared vision of creating innovative
              solutions that can transform the way people interact with
              technology. From developing web applications to exploring the
              realms of artificial intelligence, we are dedicated to pushing the
              boundaries of what is possible.
            </p>
            <p>
              Currently, we are focusing on projects that integrate AI into
              education, particularly in enhancing the learning experience for
              students in Kazakh language and other subjects. We believe that
              through technology, we can make learning more engaging,
              accessible, and effective for everyone.
            </p>
            <p>
              Join us on this exciting journey as we continue to learn, grow,
              and innovate in the world of software engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
