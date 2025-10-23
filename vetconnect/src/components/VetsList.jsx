import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

function VetsList({ vets }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [likedVets, setLikedVets] = useState({}); // Track liked vets

  const filteredVets = vets.filter((vet) =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShow = (vet) => {
    setSelectedVet(vet);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  const handleBook = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${selectedVet.name} on ${selectedDate}`);
    handleClose();
  };

  const handleLike = (id) => {
    setLikedVets((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: "#28a745" }}>
          Meet Our Veterinarians
        </h2>
        <input
          type="text"
          placeholder="Search vets by name..."
          className="form-control w-50 mx-auto mt-3 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Vets Grid */}
      <div className="row">
        {filteredVets.length > 0 ? (
          filteredVets.map((vet) => (
            <div key={vet.id} className="col-md-4 mb-4">
              <div
                className="card shadow-sm h-100 border-0 rounded-4 hover-card"
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  overflow: "hidden",
                }}
              >
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="card-img-top rounded-top-4"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold" style={{ color: "#28a745" }}>
                    {vet.name}
                  </h5>
                  <p className="text-muted">{vet.specialty}</p>

                  {/* Rating and Likes */}
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                    <div>
                      {[...Array(4)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                      <i className="bi bi-star-half text-warning"></i>
                    </div>
                    <button
                      className="btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      onClick={() => handleLike(vet.id)}
                      style={{
                        width: "36px",
                        height: "36px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <i
                        className={`bi ${
                          likedVets[vet.id]
                            ? "bi-heart-fill text-danger"
                            : "bi-heart text-secondary"
                        }`}
                      ></i>
                    </button>
                    <span className="text-muted small">
                      {vet.likes + (likedVets[vet.id] ? 1 : 0)} Likes
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/vets/${vet.id}`}
                      className="btn"
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "10px",
                        fontWeight: "600",
                      }}
                    >
                      View Profile
                    </Link>
                    <Button
                      onClick={() => handleShow(vet)}
                      style={{
                        backgroundColor: "#ff66a3",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No veterinarians found.
          </p>
        )}
      </div>

      {/* Appointment Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Book Appointment {selectedVet ? `with ${selectedVet.name}` : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBook}>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-end mt-3">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VetsList;
