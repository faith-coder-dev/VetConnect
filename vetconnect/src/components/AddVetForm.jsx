import React, { useState } from "react";

function AddVetForm() {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    location: "",
    contact: "",
    image: "",
    rating: 0,
    likes: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/vets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => alert("Vet added successfully!"))
      .catch(() => alert("Error adding vet."));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Add New Vet</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {["name", "specialty", "location", "contact", "image", "rating","like"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100" type="submit">
          Add Vet
        </button>
      </form>
    </div>
  );
}

export default AddVetForm;
