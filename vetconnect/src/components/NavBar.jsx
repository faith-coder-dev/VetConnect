import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
 
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
          style={{ color: "#ff66a3", fontSize: "1.5rem" }}
        >
          <i className="bi bi-heart-pulse-fill me-2" style={{ color: "#28a745" }}></i>
          VetConnect
        </Link>

      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link fw-semibold " +
                  (isActive ? "text-success border-bottom border-success" : "text-dark")
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/vets"
                className={({ isActive }) =>
                  "nav-link fw-semibold " +
                  (isActive ? "text-success border-bottom border-success" : "text-dark")
                }
              >
                Vets
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link fw-semibold " +
                  (isActive ? "text-pink border-bottom border-pink" : "text-dark")
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  "nav-link fw-semibold " +
                  (isActive ? "text-pink border-bottom border-pink" : "text-dark")
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
