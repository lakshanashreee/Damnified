import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Silk from './Silk';
import './Project.css';

const Project = () => {
  const projects = [
        {
      title: "SkillSwap",
      description: "Developed a React.js-based responsive frontend for users to list and browse skills, with PostgreSQL for secure data storage. Implemented Node.js and Express.js backend for managing skill swap requests, user profiles, and admin moderation.",
      headerColor: "#404040", // Lighter gray
      technologies: ["Node.js", "Express.js", "React.js", "PostgreSQL", "Git"],
      link: "https://github.com/lakshanashreee/Skill-Swap", // Replace with actual URL, e.g., "https://skillswap-app.com"
      hasLink: true,
    },
     {
      title: "Invisilock: Secure Data Hiding",
      description: "A steganography-based system to hide sensitive data within images. Used encryption techniques to protect data before embedding it into the image. Designed a simple GUI for easy data encoding and decoding by users.",
      headerColor: "#474747", // Lightest gray
      technologies: ["Python", "Cryptography", "Image Processing", "Steganography"],
      link: "https://github.com/lakshanashreee/InvisiLock", // Replace with actual URL, e.g., "https://invisilock-app.com"
      hasLink: true,
    },
    {
      title: "Content Creator Portfolio",
      description: "This is my first freelancing project, added smooth animations and effects to improve user experience. Designed a responsive layout for easy navigation on all devices.",
      headerColor: "#2a2a2a", // Dark gray for a classy look
      technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Vercel"
      ],
      link: "https://shwetha-portfolio.vercel.app/", 
      hasLink: true,
    },
    {
      title: "Smart Irrigation System",
      description: "Developed an IoT-based smart irrigation system to optimize water usage in agriculture. Used soil moisture sensors to monitor soil conditions and automated watering using live weather api.",
      headerColor: "#2a2a2a", // Dark gray for a classy look
      technologies: ["Java", "Javafx", "WeatherApi", "Git", "GitHub", "Vercel"
      ],
      link: "https://github.com/lakshanashreee/Smart-Irrigation-System", 
      hasLink: true,
    },
    {
      title: "Solar Filament Detection",
      description: "Developed an image processing algorithm to detect solar filaments in astrophotography images using yolo. Utilized OpenCV for image analysis and feature extraction. Created a user-friendly interface for uploading images and viewing detection results.",
      headerColor: "#474747", // Lightest gray
      technologies: ["Python", "Yolo", "OpenCV", ],
      link: "https://github.com/lakshanashreee/Solar-Filament-Detection", // Replace with actual URL, e.g., "https://invisilock-app.com"
      hasLink: true,
    },
    {
      title: "Personal Growth Tracker",
      description: "Developed a web application to help users set and track personal growth goals. Implemented features for goal setting, progress tracking, and motivational reminders.",
      headerColor: "#333333", // Slightly lighter gray
      technologies: ["Vue", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
      link: "https://github.com/lakshanashreee/PERSONALGROWTHTRACKER", // Replace with actual URL, e.g., "https://elderly-silver-care.com"
      hasLink: true,
    },
    {
      title: "Pawtrack: Stray Animal Rescue Network",
      description: "Built a web app to report and track injured stray animals. Used Firebase for real-time updates and data storage. A simple UI interface for smooth use.",
      headerColor: "#3a3a3a", // Medium gray
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      link: "https://github.com/lakshanashreee/WildlifeManagementSystem/tree/master/DynamicWebDemo/DynamicWebDemo", // Replace with actual URL, e.g., "https://pawtrack-app.com"
      hasLink: true,
    },

   
    {
      title: "Fake News Detection System",
      description: "A machine learning-based system to classify news articles as real or fake. Used natural language processing techniques to analyze text content. Developed a web interface for users to input news articles and receive authenticity results.",
      headerColor: "#474747", // Lightest gray
      technologies: ["Python", "Machine Learning", "NLP", "Flask"],
      link: "https://github.com/lakshanashreee/Fake-News-Detection-Website", // Replace with actual URL, e.g., "https://invisilock-app.com"
      hasLink: true,
    },
    
    
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('card-animate');
      }, index * 300); // Increased delay for a more dramatic effect
    });
  }, []);

  console.log('Projects:', projects);

  if (!projects.length) {
    return <div className="no-projects">No projects available. Please add some projects.</div>;
  }

  return (
    <main className="projects-page">
      <div className="background-container">
        <Silk
          speed={5}
          scale={1}
          color="#8800ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <Link to="/" className="home-button" aria-label="Go Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="home-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
        </svg>
      </Link>
      <h1 className="page-title">My Projects</h1>
      <p className="page-intro">
        Explore my collection of innovative projects, each demonstrating a unique blend of creativity and technical expertise.
      </p>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header" style={{ backgroundColor: project.headerColor }}>
              <h2 className="project-title">{project.title || 'Untitled Project'}</h2>
            </div>
            <div className="project-content">
              <p className="project-description">{project.description || 'No description available.'}</p>
              <div className="project-technologies">
                {(project.technologies || []).map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.hasLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-link ${!project.hasLink ? 'disabled' : ''}`}
                  onClick={(e) => !project.hasLink && e.preventDefault()}
                  aria-disabled={!project.hasLink}
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Project;