import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon ");
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div className="contact-page py-5">
      
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#28a745" }}>
          Get in <span style={{ color: "#ff66a3" }}>Touch</span>
        </h1>
        <p className="text-muted w-75 mx-auto">
          Have questions or feedback? We're here to help! Fill out the form below and our team will get in touch soon.
        </p>
      </div>

     
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-5 rounded-4 mx-auto bg-white"
          style={{ maxWidth: "650px" }}
        >
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="bi bi-person-circle me-2 text-success"></i>Full Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control p-3 border-2"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="bi bi-envelope-fill me-2 text-success"></i>Email Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control p-3 border-2"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <i className="bi bi-chat-dots-fill me-2 text-success"></i>Your Message
            </label>
            <textarea
              name="message"
              rows="5"
              className="form-control p-3 border-2"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100 py-3 fw-bold text-white"
            style={{ backgroundColor: "#ff66a3", border: "none" }}
          >
            <i className="bi bi-send-fill me-2"></i>Send Message
          </button>
        </form>
      </div>

     
      <div className="text-center mt-5">
        <h5 className="fw-bold text-success">Other Ways to Reach Us</h5>
        <p className="text-muted">
          <i className="bi bi-geo-alt-fill text-danger me-2"></i>
          Nairobi, Kenya
        </p>
        <p className="text-muted">
          <i className="bi bi-telephone-fill text-success me-2"></i>
          +254 712 345 678
        </p>
        <p className="text-muted">
          <i className="bi bi-envelope-open text-primary me-2"></i>
          support@vetconnect.com
        </p>
      </div>
    </div>
  );
}

export default Contact;
