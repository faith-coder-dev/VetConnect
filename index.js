document.addEventListener("DOMContentLoaded", () => {
  const vetList = document.getElementById("vet-list");
  const form = document.getElementById("search-form");
  const feedback = document.getElementById("search-feedback");

  // Display all vets
  function displayVets() {
    fetch("http://localhost:3000/vets")
      .then(response => response.json())
      .then(data => {
        vetList.innerHTML = "";
        data.forEach(vet => createVetCard(vet));
      })
      .catch(err => console.error("Error fetching vets:", err));

  }


  // Create vet card 
  function createVetCard(vet, highlight = false) {
    const li = document.createElement("li");
    li.classList.add("vet-card");
    if (highlight) li.classList.add("highlight");

    li.innerHTML = `
      <img src="${vet.image}" alt="${vet.name}" class="vet-img">
      <h3>${vet.name}</h3>
      <p>Specialty: ${vet.specialty}</p>
      <p>Location: ${vet.location}</p>
      <p>Phone: ${vet.contact}</p>
      <button class="contact-btn">Contact Vet</button>
      <button type="button" class="ok-btn">Ok</button> 
    `;

    // Add event listener for contact button
    li.querySelector(".contact-btn").addEventListener("click", () => {
      alert(` Contact ${vet.name}: ${vet.contact}`);
    });

    // Ok button
    li.querySelector(".ok-btn").addEventListener("click", () => {
      document.getElementById("vet-list").innerHTML = `
      <div class="vet-card highlight">
        <img src="${vet.image}" alt="${vet.name}" class="vet-img">
        <h2>${vet.name}</h2>
        <p>Specialty: ${vet.specialty}</p>
        <p>Location: ${vet.location}</p>
        <p>Phone: ${vet.contact}</p>
        <button type="button" class="ok-btn">Ok</button>
      </div>
    `;

      document.querySelector(".ok-btn").addEventListener("click", () => {
        displayVets();
      });
    });

    vetList.appendChild(li);
  }


  form.addEventListener("submit", (e) => {
    e.preventDefault();


    const location = document.getElementById("location").value.toLowerCase();
    const specialty = document.getElementById("specialty").value.toLowerCase();

    fetch("http://localhost:3000/vets")
      .then(response => response.json())
      .then(data => {
        vetList.innerHTML = "";
        const filteredVets = data.filter(vet => {
          const matchesLocation = location ? vet.location.toLowerCase().includes(location) : true;
          const matchesSpecialty = specialty ? vet.specialty.toLowerCase().includes(specialty) : true;
          return matchesLocation && matchesSpecialty;

        });
        if (filteredVets.length === 0) {
          feedback.innerText = "No vets available in this location!";
        } else {
          feedback.innerText = "";
          filteredVets.forEach(vet => createVetCard(vet, true));
        }
      }).catch(err => console.error("Error fetching vets:", err));
  });

  displayVets();
});

