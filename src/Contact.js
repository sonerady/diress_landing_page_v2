import React, { useState } from "react";
import "./Contact.css";
import logo from "./logo.png";

function Contact() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
      setSubmitStatus("success");
      setFormData({ subject: "", description: "" }); // Clear form

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="contact-container">
      <video autoPlay muted loop className="background-video">
        <source src="https://un.ms//assets/pile/sky.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="contact-content">
        <img src={logo} alt="Logo" className="contact-logo" />
        <h1 className="contact-title">Contact Us</h1>

        {submitStatus === "success" && (
          <div className="status-message success">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="status-message error">
            Something went wrong. Please try again later.
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              className={errors.subject ? "error-input" : ""}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <span className="error-text">{errors.subject}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="6"
              className={errors.description ? "error-input" : ""}
              disabled={isSubmitting}
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="button-content">
                <span className="spinner"></span>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
