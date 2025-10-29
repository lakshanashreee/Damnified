import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import { Link } from "react-router-dom";
import MagnetLines from "./MagnetLines";
import DotCursor from "./DotCursor";

export default function About() {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <DotCursor />
      <Link to="/" className="home-button" aria-label="Go Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white hover:text-gray-400 transition duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 22V12h6v10"
          />
        </svg>
      </Link>

      <MagnetLines
        rows={18}
        columns={12}
        containerSize="100vw"
        lineColor="#ffffff"
        lineWidth="0.8vmin"
        lineHeight="6vmin"
        baseAngle={0}
        className="magnet-lines-background"
      />

      <div className="about-content">
        <motion.img
          src="/images/laxxu.JPG"
          alt="Lakshana Avatar"
          className="avatar"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            Full Stack Developer | Ex Intern @ NIC | Ex-Intern @ IIT Bombay | GITEX Global 2025 Exhibitor | Student Innovation Ambassador @ RIT | CSE Pre-Final Year
          </p>
        </div>
      </div>
    </motion.div>
  );
}