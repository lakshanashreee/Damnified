import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hyperspeed from './Hyperspeed';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: 'National Informatics Center',
      location: 'Chennai, India',
      role: 'Full Stack Developer Intern',
      duration: 'May 2025 - Present | Onsite',
      description: 'Developed a GIAS Alert System with Java Spring Boot and PostgreSQL for efficient metric fetching and alert categorization, along with a responsive Vue.js for the Support Management System.',
      companyLink: 'https://www.nic.gov.in/',
      techStack: ['Java', 'Spring Boot', 'Vue.js', 'PostgreSQL'],
      certificateLink: null,
    },
    {
      id: 2,
      company: 'FOSSEE - Osdag',
      location: 'IIT Bombay',
      role: 'Automation Tester',
      duration: 'Feb 2025 - Jun 2025 | Remote',
      description: 'Developed automated Python and batch scripts, tested structural design modules, and enhanced OSI file testing processes to improve accuracy and workflow efficiency.',
      companyLink: 'https://fossee.in/',
      techStack: ['Python', 'SQL', 'Tableau', 'Pandas'],
      certificateLink: 'https://www.linkedin.com/posts/lakshana-shree-894387286_officially-completed-im-excited-to-activity-7348960591358631936-KE79?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEV3gDABqkb4OwsMmKusk4mH0CyoDNvK6kU',
    },
    {
      id: 3,
      company: 'Edunet Foundation',
      location: 'Bengaluru, India',
      role: 'AI Azure Intern',
      duration: 'May 2025 - Jun 2025 | Remote',
      description: 'Developed a deep learning model in Python for MNIST digit classification and gained practical expertise in AI and Microsoft Azure through structured courses and hands-on training.',
      companyLink: 'https://edunetfoundation.org/',
      techStack: ['Python', 'AI', 'Azure'],
      certificateLink: 'https://www.linkedin.com/posts/lakshana-shree-894387286_microsoft-azure-ai-activity-7350533354653437956-WH55?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEV3gDABqkb4OwsMmKusk4mH0CyoDNvK6kU',
    },
    {
      id: 4,
      company: 'Edunet Foundation',
      location: 'Bengaluru, India',
      role: 'Cyber Security Intern',
      duration: 'Jan 2025 - Feb 2025',
      description: 'Built secure steganography with encryption to hide data in images, ensuring image quality and confidentiality even under compression.',
      companyLink: 'https://edunetfoundation.org/',
      techStack: ['Python', 'Stenography',  'OpenCV', 'Cryptography'],
      certificateLink: 'https://www.linkedin.com/posts/lakshana-shree-894387286_cybersecurity-internship-aicte-activity-7360736652723412992-5E27?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEV3gDABqkb4OwsMmKusk4mH0CyoDNvK6kU',
    },
  ];

  const itemsRef = useRef([]);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px' }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="min-h-screen py-16 relative bg-black">
      <div className="fixed inset-0 z-0">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            },
          }}
        />
      </div>
      <style>
        {`
          .home-button {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 50;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            padding: 0.5rem;
            backdrop-filter: blur(4px);
            transition: all 0.3s ease;
          }
          .home-button:hover {
            background: rgba(0, 0, 0, 0.15);
            transform: scale(1.05);
          }
        `}
      </style>
      <Link to="/" className="home-button" aria-label="Go Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white hover:text-gray-400 transition duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
        </svg>
      </Link>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-16">My Professional Journey</h2>
        <div className="relative min-h-[1600px]">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full z-0 timeline-line"></div>
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`roadmap-item flex mb-24 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              style={{ '--delay': `${index * 0.3}s` }}
            >
              <div className="w-7/12 px-9">
                <div
                  className={`card-container ${flippedCards[exp.id] ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(exp.id)}
                >
                  <div className="card-front bg-white p-8 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{exp.role}</h3>
                    <h4 className="text-xl text-gray-600 mb-2">{exp.company} - {exp.location}</h4>
                    <p className="text-sm text-gray-500 mb-4">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                  <div className="card-back bg-blue-50 p-8 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{exp.company}</h3>
                    <a
                      href={exp.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mb-4 block"
                    >
                      Visit Company Website
                    </a>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">Tech Stack:</h4>
                    <ul className="list-disc list-inside mb-4">
                      {exp.techStack.map((tech, i) => (
                        <li key={i} className="text-gray-600">{tech}</li>
                      ))}
                    </ul>
                    {exp.certificateLink && (
                      <a
                        href={exp.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-2/12 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full z-10"></div>
              </div>
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;