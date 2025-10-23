import React from "react";

function About() {
  return (
    <div className="about-page container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#28a745" }}>
          About <span style={{ color: "#ff66a3" }}>VetConnect</span>
        </h1>
        <p className="lead text-muted mt-3 w-75 mx-auto">
          VetConnect bridges the gap between pet owners and professional veterinarians.
          We aim to make veterinary care more accessible, transparent, and compassionate — 
          because every pet deserves the best.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="row text-center g-4">
        {/* Mission */}
        <div className="col-md-4">
          <div
            className="card shadow-sm p-4 border-0 rounded-4"
            style={{
              backgroundColor: "#f9fff9",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <i className="bi bi-bullseye fs-1" style={{ color: "#28a745" }}></i>
            <h4 className="fw-bold mt-3" style={{ color: "#28a745" }}>
              Our Mission
            </h4>
            <p className="text-muted">
              To connect pet owners with reliable, caring, and skilled veterinarians through
              an easy-to-use platform that promotes trust and accessibility.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="col-md-4">
          <div
            className="card shadow-sm p-4 border-0 rounded-4"
            style={{
              backgroundColor: "#fff5fa",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 102, 163, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <i className="bi bi-eye fs-1" style={{ color: "#ff66a3" }}></i>
            <h4 className="fw-bold mt-3" style={{ color: "#ff66a3" }}>
              Our Vision
            </h4>
            <p className="text-muted">
              To become the go-to digital hub for pet healthcare — fostering healthier,
              happier pets and more connected communities.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="col-md-4">
          <div
            className="card shadow-sm p-4 border-0 rounded-4"
            style={{
              backgroundColor: "#f9fff9",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <i className="bi bi-heart-pulse fs-1" style={{ color: "#28a745" }}></i>
            <h4 className="fw-bold mt-3" style={{ color: "#28a745" }}>
              Our Values
            </h4>
            <p className="text-muted">
              Compassion, trust, and innovation guide everything we do — ensuring every pet
              owner feels supported and confident in their care choices.
            </p>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="text-center mt-5">
        <p className="text-muted w-75 mx-auto">
          VetConnect is more than a platform — it is a community of pet lovers and professionals
          united by one goal: to ensure every animal receives the best care possible.
        </p>
      </div>
    </div>
  );
}

export default About;
