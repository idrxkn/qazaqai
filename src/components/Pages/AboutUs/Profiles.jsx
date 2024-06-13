import React from "react";
import "./Profiles.css";
import dk from "../../../assets/dark.jpg";
import ta from "../../../assets/ta.jpg";
import yb from "../../../assets/yb.jpg";
import arai from "../../../assets/arai.jpg";
const profiles = [
  {
    href: "https://www.instagram.com/idrxkn/",
    name: "Darkhan Bekuzak",
    title: "Frontend dev | UX/UI dev",
    age: "20 years old",
    experience:
      "React JS, Figma, Branding enthusiast. The role involved leading the design and implementation of user interfaces, enhancing user experience, and managing the overall project to ensure the platform was both functional and visually engaging while meeting the project's technical and educational objectives.s",
    src: dk,
  },
  {
    href: "https://www.instagram.com/tikosch/",
    name: "Tairzhan Kasenov",
    title: "ML dev | Backend dev",
    age: "20 years old",
    experience:
      "Python, .NET, Played a crucial role in integrating advanced machine learning models to enhance the platform's capabilities and was responsible for developing and managing the backend infrastructure that supports the complex data processing and machine learning tasks.",
    src: ta,
  },
  {
    href: "https://www.instagram.com/xdyeara/",
    name: "Yerbol Irgaliyev",
    title: "Backend dev | ML dev",
    age: "20 years old",
    experience:
      ".NET middle dev. Was instrumental in the architecture and implementation of backend services that support the platform's functionality, including data management and server-side logic. Additionally, Yerbol contributed to the integration and optimization of machine learning algorithms that enhance the platform's educational capabilities.",
    src: yb,
  },
  {
    href: "https://www.instagram.com/arailym_tleubayeva/",
    name: "Arailym Tleubayeva",
    title: "Supervisor. Senior lecturer at AITU",
    age: "28 years old",
    experience: `Directed the overall project, from initial concept through to execution, ensuring that project milestones were met and aligned with the educational goals.Played a key role in addressing technical and conceptual challenges, fostering an innovative approach to creating a platform.  Developed and implemented strategic plans that guided the research, design, and development phases.`,
    src: arai,
  },
];
const Profiles = () => {
  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <a href={profile.href} className="aa">
          <div key={index} className="profile-card">
            <div className="profile-image">
              <img src={profile.src} alt={profile.name} />
              <div className="overlay-img">
                <h2>{profile.name}</h2>
                <h3>{profile.title}</h3>
              </div>
            </div>
            <div className="profile-info">
              <p>
                <strong>Age:</strong> {profile.age}
              </p>

              <p>
                <strong>Contribution:</strong> {profile.experience}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Profiles;
