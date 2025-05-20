import React from "react";

export default function About() {
  return (
    <div className="page-container px-6 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
      <p className="text-lg max-w-3xl mx-auto text-center text-gray-700">
        Hello! I’m Lakshana, a web developer with a strong passion for building clean, user-friendly interfaces and seamless user experiences. I love solving problems with code and continuously learning new technologies.
      </p>
      <div className="mt-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">My Interests</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Frontend development (React, TailwindCSS)</li>
          <li>UI/UX design principles</li>
          <li>Open source contribution</li>
          <li>Learning about Web Performance & Accessibility</li>
        </ul>
      </div>
    </div>
  );
}
