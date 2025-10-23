import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VetDetails() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vets/${id}`)
      .then((res) => res.json())
      .then((data) => setVet(data))
      .catch((err) => console.error("Error fetching vet:", err));
  }, [id]);

  if (!vet) {
    return <p className="text-center my-5">Loading details...</p>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm mx-auto border-0 rounded-4" style={{ maxWidth: "600px" }}>
        <img
          src={vet.image}
          alt={vet.name}
          className="card-img-top rounded-top-4"
          style={{ height: "350px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h3 className="fw-bold text-pink">{vet.name}</h3>
          <p className="text-muted mb-1">{vet.specialty}</p>
          <p>
            <i className="bi bi-geo-alt text-success"></i> {vet.location}
          </p>
          <p>
            <i className="bi bi-telephone text-success"></i> {vet.contact}
          </p>

          {/* Rating Stars */}
          <div className="mb-3">
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
          <div className="d-flex justify-content-center gap-2">
            <Link to="/vets" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left-circle"></i> Back
            </Link>

            <Link
              to="/book"
              state={{ vetName: vet.name }}
              className="btn btn-success"
            >
              <i className="bi bi-calendar-check"></i> Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetDetails;
