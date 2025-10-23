import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function BookAppointment() {
  const location = useLocation();
  const preselectedVet = location.state?.vetName || "";

  const [formData, setFormData] = useState({
    vetName: preselectedVet,
    petName: "",
    ownerName: "",
    date: "",
    time: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save appointment");

      setSuccessMsg("✅ Appointment booked successfully!");
      setFormData({
        vetName: preselectedVet,
        petName: "",
        ownerName: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div
        className="card shadow-sm p-4 mx-auto border-0 rounded-4"
        style={{ maxWidth: "600px" }}
      >
        <h3 className="text-center fw-bold text-success mb-4">
          Book Appointment
        </h3>

        {/* Success/Error messages */}
        {successMsg && (
          <div style={{ color: "green", marginBottom: "15px" }}>
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{ color: "red", marginBottom: "15px" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Veterinarian</label>
            <input
              type="text"
              name="vetName"
              className="form-control"
              value={formData.vetName}
              onChange={handleChange}
              required
              readOnly={!!preselectedVet}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pet Name</label>
            <input
              type="text"
              name="petName"
              className="form-control"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              className="form-control"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
