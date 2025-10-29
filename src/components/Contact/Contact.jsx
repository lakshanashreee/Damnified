import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Particles from "./Particles";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [visibleElements, setVisibleElements] = useState({
    title: false,
    formBox: false,
    emailBox: false,
    phoneBox: false,
    homeButton: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleElements((prev) => ({ ...prev, title: true })), 300),
      setTimeout(() => setVisibleElements((prev) => ({ ...prev, formBox: true })), 600),
      setTimeout(() => setVisibleElements((prev) => ({ ...prev, emailBox: true })), 800),
      setTimeout(() => setVisibleElements((prev) => ({ ...prev, phoneBox: true })), 1000),
      setTimeout(() => setVisibleElements((prev) => ({ ...prev, homeButton: true })), 1200),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/xyzpoyjz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setIsSubmitting(false);
        setSubmitStatus("error");
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
    }
  };

  const handleEmailClick = () => {
    const email = "lakshanalakshu2408@gmail.com";
    const subject = "Contact from Portfolio";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  const handlePhoneClick = () => {
    const phoneNumber = "+919940104514";
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="contact-container">
      <style>
        {`
          .home-button {
            position: absolute;
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
      <Link to="/" className={`home-button ${visibleElements.homeButton ? "pop-in" : ""}`} aria-label="Go Home">
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
      <Particles
        particleColors={["#6600ffff", "#9c6bfeff", "#f088feff"]}
        particleCount={10000}
        speed={0.15}
        particleBaseSize={15}
        moveParticlesOnHover={true}
        alphaParticles={false}
        className="particles-background"
      />
      <h1 className={`contact-title ${visibleElements.title ? "pop-in" : ""}`}>
        Get in Touch
      </h1>
      <div className="contact-boxes">
        <div className={`contact-box form-box ${visibleElements.formBox ? "pop-in" : ""}`}>
          <h2 className="box-title">Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className={errors.message ? "error" : ""}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? <div className="spinner"></div> : "Send Message"}
            </button>
            {submitStatus === "success" && (
              <p className="success-message">Submitted Successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="error-message">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
        <div className={`contact-box email-box ${visibleElements.emailBox ? "pop-in" : ""}`}>
          <h2 className="box-title">Contact via Email</h2>
          <div className="contact-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <p className="contact-info">lakshanalakshu2408@gmail.com</p>
          <button className="action-button" onClick={handleEmailClick}>
            Email Me
          </button>
        </div>
        <div className={`contact-box phone-box ${visibleElements.phoneBox ? "pop-in" : ""}`}>
          <h2 className="box-title">Contact via Phone</h2>
          <div className="contact-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <p className="contact-info">+91 9940104514</p>
          <button className="action-button" onClick={handlePhoneClick}>
            Call Me
          </button>
        </div>
      </div>
    </div>
  );
}