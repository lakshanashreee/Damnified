import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const sections = ["About", "Skills", "Projects", "Contact", "Resume", "Internship"];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to My Portfolio</h1>
      <p className="home-subtitle">
        Hi! I’m Lakshana, a passionate developer who loves building beautiful, interactive web experiences.
      </p>
      <div className="section-buttons">
        {sections.map((section) => (
          <button
            key={section}
            className="section-button"
            onClick={() => navigate(`/${section.toLowerCase()}`)}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}
