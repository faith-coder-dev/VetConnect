import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VetsList from "./components/VetsList";
import VetDetails from "./components/VetDetails";
import AddVetForm from "./components/AddVetForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"; // custom pink & green theme (we’ll create next)

function App() {
  const [vets, setVets] = useState([]);

  // Fetch all vets from local JSON server
  useEffect(() => {
    fetch("http://localhost:3001/vets")
      .then((res) => res.json())
      .then((data) => setVets(data))
      .catch((err) => console.error("Error fetching vets:", err));
  }, []);

  // Add new vet
  const addVet = (newVet) => {
    fetch("http://localhost:3001/vets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVet),
    })
      .then((res) => res.json())
      .then((data) => setVets([...vets, data]))
      .catch((err) => console.error("Error adding vet:", err));
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home vets={vets} />} />

          {/* All Vets Page */}
          <Route path="/vets" element={<VetsList vets={vets} setVets={setVets} />} />

          {/* Dynamic Vet Details Page */}
          <Route path="/vets/:id" element={<VetDetails vets={vets} />} />

          {/* Add New Vet Page */}
          <Route path="/add-vet" element={<AddVetForm onAddVet={addVet} />} />

          {/* About & Contact Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
