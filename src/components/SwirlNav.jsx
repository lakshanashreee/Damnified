import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  BadgeCheckIcon,
  FolderIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

const sections = [
  { id: "home", label: "Home", icon: HomeIcon, content: "Welcome to my portfolio! This is the home section." },
  { id: "about", label: "About", icon: UserIcon, content: "About me: passionate developer with cool skills." },
  { id: "skills", label: "Skills", icon: CodeBracketIcon, content: "Skills: React, Tailwind, Framer Motion, and more." },
  { id: "certifications", label: "Certifications", icon: BadgeCheckIcon, content: "Certified in React and Web Design." },
  { id: "projects", label: "Projects", icon: FolderIcon, content: "Projects include portfolio, apps, dashboards." },
  { id: "contact", label: "Contact", icon: EnvelopeIcon, content: "Reach me at email@example.com" },
];

const radius = 140;
const center = 150;
const total = sections.length;

function calculatePosition(index, rotation = 0) {
  const angle = ((360 / total) * index + rotation) * (Math.PI / 180);
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

// Particle component for subtle background effect
function Particle({ size, x, y, delay }) {
  const style = useSpring({
    loop: true,
    to: [{ opacity: 1, transform: "translateY(5px)" }, { opacity: 0.5, transform: "translateY(-5px)" }],
    from: { opacity: 0.5, transform: "translateY(0px)" },
    delay,
    config: { duration: 3000 },
  });
  return (
    <animated.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255 255 255 / 0.15)",
        top: y,
        left: x,
        ...style,
      }}
    />
  );
}

export default function SwirlNav() {
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);

  // Animate rotation with react-spring
  const { rot } = useSpring({
    rot: rotation,
    config: { mass: 5, tension: 120, friction: 40 },
  });

  // Handle click to rotate swirl so selected is top
  function handleSelect(id) {
    if (id === selected) {
      setSelected(null);
      setRotation(0);
    } else {
      const index = sections.findIndex((s) => s.id === id);
      const rotateTo = 270 - (360 / total) * index;
      setSelected(id);
      setRotation(rotateTo);
    }
  }

  return (
    <div className="relative flex flex-col items-center mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-700 via-indigo-900 to-black opacity-80 -z-10" />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <Particle
          key={i}
          size={`${5 + Math.random() * 5}px`}
          x={`${Math.random() * 280}px`}
          y={`${Math.random() * 280}px`}
          delay={i * 200}
        />
      ))}

      <animated.svg
        width={300}
        height={300}
        style={{ transformOrigin: "50% 50%", transform: rot.to(r => `rotate(${r}deg)`) }}
        className="cursor-pointer select-none"
      >
        <circle cx={center} cy={center} r={radius + 40} fill="rgba(100 116 139 / 0.25)" />

        {sections.map(({ id, label, icon: Icon }, i) => {
          const { x, y } = calculatePosition(i, rotation);
          const isSelected = selected === id;

          return (
            <animated.g
              key={id}
              onClick={() => handleSelect(id)}
              style={{
                transform: rot.to(r => {
                  // Calculate relative angle of item (position after rotation)
                  const angle = (360 / total) * i + r;
                  // Scale selected item bigger
                  const scale = isSelected ? 1.7 : 1;
                  return `translate(${x}px, ${y}px) scale(${scale})`;
                }),
                filter: selected && !isSelected ? "blur(2px) brightness(0.7)" : "none",
                transition: "filter 0.3s ease",
              }}
              className="transition-all duration-300"
            >
              {/* Icon background circle */}
              <circle
                r={30}
                fill={isSelected ? "#6366F1" : "#4F46E5"}
                stroke="#312E81"
                strokeWidth={2}
                className="shadow-lg hover:shadow-2xl transition-shadow"
              />

              {/* SVG icon centered */}
              <Icon
                className="text-white"
                style={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                x={-12}
                y={-12}
                fill="white"
              />
              <text
                x={0}
                y={45}
                fill="white"
                textAnchor="middle"
                fontWeight="600"
                fontSize={14}
                pointerEvents="none"
                userSelect="none"
              >
                {label}
              </text>
            </animated.g>
          );
        })}
      </animated.svg>

      {/* Content panel */}
      {selected && (
        <div className="mt-10 max-w-xl bg-white rounded-lg shadow-lg p-8 text-center text-gray-900">
          <p className="text-lg">{sections.find(s => s.id === selected).content}</p>
          <button
            onClick={() => handleSelect(selected)}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
