import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CircularText from "./CircularText";
import TargetCursor from "./TargetCursor";
import Cubes from "./Cubes";
import Orb from "./Orb";
import "./Home.css";

function TextPressure({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x: x / rect.width, y: y / rect.height });
    }
  };

  return (
    <span
      ref={textRef}
      className="text-pressure"
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const sections = ["About", "Skills", "Projects", "Contact", "Resume", "Experience"];
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    subtitle: false,
    buttons: Array(sections.length).fill(false),
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const homeContainerRef = useRef(null);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Pop-up effect for main page elements
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, title: true }));
      }, 300),
      setTimeout(() => {
        setVisibleElements((prev) => ({ ...prev, subtitle: true }));
      }, 600),
      ...sections.map((_, index) =>
        setTimeout(() => {
          setVisibleElements((prev) => ({
            ...prev,
            buttons: prev.buttons.map((val, i) => (i === index ? true : val)),
          }));
        }, 900 + index * 200)
      ),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Toggle full-screen mode for the home-container
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (homeContainerRef.current) {
        homeContainerRef.current.requestFullscreen().catch((err) => {
          console.error("Failed to enter fullscreen:", err);
        });
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen:", err);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <div className="home-container" ref={homeContainerRef}>
      {/* Fixed Orb Background */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      </div>

      {/* Cubes Background */}
      <Cubes
        gridSize={8}
        maxAngle={60}
        radius={4}
        borderStyle="var(--cube-face-border)"
        faceColor="var(--cube-face-bg)"
        rippleColor="var(--accent)"
        rippleSpeed={1.5}
        autoAnimate={true}
        rippleOnClick={true}
        className="cubes-background"
      />

      {/* Target Cursor Component */}
      <TargetCursor targetSelector=".section-button" spinDuration={2} hideDefaultCursor={true} />

      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {theme === "light" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          )}
        </svg>
      </button>

      {/* Tie Symbol for Fullscreen Toggle */}
      <button className="tie-symbol" onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm0 6v14m-6-7l2-2m4 2l2 2m-8 0h12"
          />
        </svg>
      </button>

      {/* Close Button (appears in fullscreen on hover) */}
      {isFullscreen && (
        <button className="close-button" onClick={toggleFullscreen} aria-label="Exit Fullscreen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Touch Icon (Decorative, Non-Interactive) */}
      <div className="touch-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15.5l-3-3m0 0l-3-3m3 3v9m3-9h9m-3-9l-3-3m0 0l-3 3"
          />
        </svg>
      </div>

      {/* Main Content with Text Pressure Effect */}
      <h1 className={`home-title ${visibleElements.title ? "pop-in" : ""}`}>
        <TextPressure>Welcome to Lakshana's Portfolio</TextPressure>
      </h1>
      <p className={`home-subtitle ${visibleElements.subtitle ? "pop-in" : ""}`}>
        Hi! I’m Lakshana, a passionate developer crafting beautiful, interactive web experiences.
      </p>

      {/* SECTION BUTTONS – RESUME OPENS PDF */}
      <div className="section-buttons">
        {sections.map((section, index) => (
          <button
            key={section}
            className={`section-button ${visibleElements.buttons[index] ? "pop-in" : ""}`}
            onClick={() => {
              if (section === "Resume") {
                // PDF lives in /public → accessible as "/Resume_SDE.pdf"
                window.open("/Resume_SDE.pdf", "_blank", "noopener,noreferrer");
              } else {
                navigate(`/${section.toLowerCase()}`);
              }
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Circular Text in Bottom-Right Corner */}
      <CircularText
        text="LAKSHANA PORTFOLIO "
        spinDuration={15}
        onHover="speedUp"
        className="circular-text-bottom-right"
      />
    </div>
  );
}