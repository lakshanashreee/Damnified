// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Project/Project";
import Experience from "./components/Experience/Experience";
// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/skills" element={<Skills />} />
         <Route path="/projects" element={<Projects />} />
         <Route path="/contact" element={<Contact/>} />
         <Route path="/experience" element={<Experience/>} />
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
