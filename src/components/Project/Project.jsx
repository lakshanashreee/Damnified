import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Silk from './Silk';
import './Project.css';

const Project = () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A sleek personal portfolio showcasing skills and projects with a modern, responsive UI.",
      headerColor: "#4a148c", // Dark purple
      technologies: ["React", "CSS", "JavaScript"],
      link: "https://example.com/portfolio",
      hasLink: true,
    },
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce app with product listings and secure payment integration.",
      headerColor: "#6a1b9a", // Medium purple
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://example.com/ecommerce",
      hasLink: true,
    },
    {
      title: "Task Manager",
      description: "A productivity app with drag-and-drop task management and real-time updates.",
      headerColor: "#7b1fa2", // Slightly lighter purple
      technologies: ["React", "Redux", "Firebase"],
      link: "#",
      hasLink: false,
    },
    {
      title: "Weather Dashboard",
      description: "A weather app delivering real-time updates using a public API.",
      headerColor: "#8e24aa", // Brighter purple
      technologies: ["JavaScript", "HTML", "CSS", "OpenWeather API"],
      link: "https://example.com/weather",
      hasLink: true,
    },
    {
      title: "Blog Platform",
      description: "A blogging site with user authentication and dynamic content management.",
      headerColor: "#ab47bc", // Lightest purple
      technologies: ["React", "Express", "PostgreSQL"],
      link: "https://example.com/blog",
      hasLink: true,
    },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('card-animate');
      }, index * 150);
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
          color="#8800ff" // Corrected hex code
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
              <a
                href={project.hasLink ? project.link : '#'}
                target={project.hasLink ? '_blank' : '_self'}
                rel={project.hasLink ? 'noopener noreferrer' : ''}
                className={`project-link ${!project.hasLink ? 'disabled' : ''}`}
                onClick={(e) => !project.hasLink && e.preventDefault()}
                aria-disabled={!project.hasLink}
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Project;