import React from "react";
import { Link } from "react-router-dom";

function VetCard({ vet, onLike }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0 rounded-4 hover-card">
        <img
          src={vet.image}
          alt={vet.name}
          className="card-img-top rounded-top-4"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title text-pink fw-bold">{vet.name}</h5>
          <p className="card-text text-muted mb-1">{vet.specialty}</p>
          <p className="text-secondary small mb-2">
            <i className="bi bi-geo-alt text-success"></i> {vet.location}
          </p>

          {/* Rating Stars */}
          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${
                  i < Math.floor(vet.rating)
                    ? "bi-star-fill text-warning"
                    : i < vet.rating
                    ? "bi-star-half text-warning"
                    : "bi-star text-muted"
                } me-1`}
              ></i>
            ))}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-2 mt-2">
            <Link to={`/vets/${vet.id}`} className="btn btn-outline-primary btn-sm">
              <i className="bi bi-person-vcard"></i> View Details
            </Link>

            <Link
              to="/book"
              state={{ vetName: vet.name }}
              className="btn btn-outline-success btn-sm"
            >
              <i className="bi bi-calendar-check"></i> Book
            </Link>
          </div>

          {/* Likes */}
          <div className="mt-3">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onLike(vet.id)}
            >
              <i className="bi bi-heart-fill"></i> {vet.likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetCard;
