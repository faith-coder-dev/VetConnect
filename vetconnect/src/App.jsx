import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VetsList from "./components/VetsList";
import VetDetails from "./components/VetDetails";
import BookAppointment from "./pages/BookAppointment";
import AddVetForm from "./components/AddVetForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

function App() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    // STATIC-FIRST strategy:
    // 1) Load a local static file (`public/vets.json`) immediately so the UI appears fast
    // 2) Then try to fetch the authoritative list from the API and replace the data if successful
    // This reduces perceived lag while still allowing fresh server data to overwrite the static list.
    const loadStaticThenApi = async () => {
      try {
        const staticRes = await fetch('/vets.json');
        if (staticRes.ok) {
          const staticData = await staticRes.json();
          setVets(staticData.vets || []);
        }
      } catch (err) {
        // ignore static load errors — we'll still try the API next
        console.warn('Could not load static vets.json:', err);
      }

      // Try API in background. If it succeeds, replace the static data.
      try {
        const apiRes = await fetch('http://localhost:3001/vets');
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          setVets(apiData);
        } else {
          console.warn('API returned non-OK status for /vets', apiRes.status);
        }
      } catch (apiErr) {
        console.warn('Could not fetch vets from API, continuing with static data:', apiErr);
      }
    };

    loadStaticThenApi();
  }, []);


  const addVet = async (newVet) => {
    try {
      const res = await fetch("http://localhost:3001/vets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVet),
      });
      if (!res.ok) throw new Error('Failed to add vet');
      const data = await res.json();
      setVets(prev => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      console.error("Error adding vet:", err);
      // Still add to state even if API fails
      const tempVet = { ...newVet, id: Date.now().toString() };
      setVets(prev => [...prev, tempVet]);
      return { success: false, data: tempVet, error: err.message };
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>

          <Route path="/" element={<Home vets={vets} />} />


          <Route path="/vets" element={<VetsList vets={vets} setVets={setVets} />} />


          <Route path="/vets/:id" element={<VetDetails vets={vets} />} />

          <Route path="/book" element={<BookAppointment />} />


          <Route path="/add-vet" element={<AddVetForm onAddVet={addVet} />} />


          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
