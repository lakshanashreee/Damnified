import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

const sections = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Certifications", id: "certifications" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
  { name: "Resume", id: "resume" },
  { name: "Internship", id: "internship" },
];

export default function Home({ onSelectSection }) {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.slow,
  });

  const buttonSprings = sections.map((_, i) =>
    useSpring({
      from: { opacity: 0, transform: "translateY(30px)" },
      to: { opacity: 1, transform: "translateY(0)" },
      delay: 700 + i * 120,
      config: config.wobbly,
    })
  );

  const [typedText, setTypedText] = React.useState("");
  const fullText = "Welcome to My Portfolio";

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <animated.div
      style={containerSpring}
      className="relative w-full max-w-6xl mx-auto px-6 py-20 text-center select-none"
    >
      {/* Neon gradient radial background */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-purple-900 via-indigo-800 to-black opacity-95"></div>

      {/* Glowing stars sparkles (CSS animation) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main heading with gradient text and glowing shadow */}
      <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgb(139,92,246)] mb-8">
        {typedText}
        <span className="animate-pulse text-pink-500">|</span>
      </h1>

      {/* Subheading with shiny underline */}
      <p className="text-2xl text-indigo-300 mb-16 relative inline-block after:content-[''] after:block after:w-full after:h-1 after:bg-gradient-to-r after:from-pink-500 after:via-purple-600 after:to-indigo-400 after:rounded after:mt-1 after:animate-pulse">
        Crafting unique digital experiences with code, creativity & passion
      </p>

      {/* Section buttons grid */}
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {sections.map((section, i) => (
          <animated.button
            key={section.id}
            style={buttonSprings[i]}
            onClick={() => onSelectSection(section.id)}
            className="
              relative
              px-8 py-4
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r from-pink-500 via-purple-700 to-indigo-600
              shadow-[0_0_20px_rgb(139,92,246)]
              hover:shadow-[0_0_40px_rgb(205,105,255)]
              transition-shadow duration-500
              hover:scale-110
              focus:outline-none
              focus:ring-4
              focus:ring-purple-700
              before:absolute before:-inset-1 before:rounded-xl before:bg-gradient-to-r before:from-pink-600 before:via-purple-700 before:to-indigo-700 before:blur-lg before:opacity-60 before:transition-opacity before:duration-500 hover:before:opacity-100
              z-10
              "
          >
            <span className="relative z-20">{section.name}</span>
            {/* Shiny animated shine */}
            <span
              className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30
              -skew-x-12 animate-shine"
              style={{ pointerEvents: "none" }}
            />
          </animated.button>
        ))}
      </div>

      {/* Extra CSS for shine animation */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(120%) skewX(-12deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 2.5s infinite;
        }
      `}</style>
    </animated.div>
  );
}
