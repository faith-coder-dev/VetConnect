import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VetDetails() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // First try the API (use port 3001 where json-server runs in this project)
        const res = await fetch(`http://localhost:3001/vets/${id}`);
        if (!res.ok) {
          throw new Error('Veterinarian not found');
        }
        const data = await res.json();
        setVet(data);
        setLoading(false);
      } catch (apiErr) {
        console.error("Error fetching from API:", apiErr);
        // If API fails, try fetching from static data
        try {
          const staticRes = await fetch('/vets.json');
          if (!staticRes.ok) throw new Error('Backup data not found');
          const allVets = await staticRes.json();
          const foundVet = allVets.vets?.find(v => v.id === id);
          if (!foundVet) throw new Error('Veterinarian not found in backup data');
          setVet(foundVet);
          setLoading(false);
        } catch (staticErr) {
          console.error("Error fetching from static:", staticErr);
          setError("Unable to load veterinarian details. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchVetDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading veterinarian details...</p>
      </div>
    );
  }

  if (error || !vet) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error || "Unable to load veterinarian details"}
        </div>
        <Link to="/vets" className="btn btn-outline-secondary mt-3">
          <i className="bi bi-arrow-left-circle"></i> Back to Vets List
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm mx-auto border-0 rounded-4" style={{ maxWidth: "800px" }}>
        <img
          src={vet.image}
          alt={vet.name}
          className="card-img-top rounded-top-4"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success mb-3">{vet.name}</h2>
            <p className="text-pink fw-bold mb-2" style={{ fontSize: "1.2rem" }}>{vet.specialty}</p>

            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <p className="mb-0">
                <i className="bi bi-geo-alt-fill text-success me-2"></i>
                {vet.location}
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone-fill text-success me-2"></i>
                {vet.contact}
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${i < Math.floor(vet.rating)
                        ? "bi-star-fill text-warning"
                        : i < vet.rating
                          ? "bi-star-half text-warning"
                          : "bi-star text-muted"
                        } me-1`}
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  ))}
                </div>
                <span className="text-muted">({vet.rating} / 5)</span>
              </div>
              <div className="mt-2">
                <i className="bi bi-heart-fill text-danger me-2"></i>
                <span>{vet.likes} likes</span>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <Link to="/vets" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left-circle me-2"></i>
                Back to List
              </Link>

              <Link
                to="/book"
                state={{ vetName: vet.name }}
                className="btn btn-success"
              >
                <i className="bi bi-calendar-check me-2"></i>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetDetails;
