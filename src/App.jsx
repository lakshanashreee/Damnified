import React, { useState } from "react";
import Home from "./components/Home";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  function handleSelectSection(id) {
    setCurrentSection(id);
    // Later: render corresponding section or scroll
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-black text-white flex flex-col items-center justify-center">
      {currentSection === "home" && <Home onSelectSection={handleSelectSection} />}
      {/* Add other sections here based on currentSection */}
    </div>
  );
}
