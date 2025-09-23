document.addEventListener("DOMContentLoaded", () => {
  const vetList = document.getElementById("vet-list");
  const form = document.getElementById("search-form");

  // Display vets from db.json
  function displayVets() {
    fetch("http://localhost:3000/vets")
      .then(res => res.json())
      .then(data => {
        vetList.innerHTML = "";
        data.forEach(vet => {
          const li = document.createElement("li");
          li.innerHTML = `
                <p>Name: ${vet.name}</p>
                <p>Specialty: ${vet.specialty}</p>
                <p>Location: ${vet.location}</p>
                <p>Phone: ${vet.contact}</p>
            `;
          vetList.appendChild(li);
        });
      })
      .catch(err => console.error("Error fetching vets:", err));
  }

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ownerName = document.getElementById("petOwnerName").value;
    const petType = document.getElementById("petType").value;
    const location = document.getElementById("location").value.toLowerCase();

    fetch("http://localhost:3000/vets")
      .then(res => res.json())
      .then(data => {
        vetList.innerHTML = "";
        const filteredVets = data.filter(vet =>
          vet.location.toLowerCase().includes(location)
        );

        if (filteredVets.length === 0) {
          document.getElementById("search-feedback").innerText =
            "No vets available in this location!";
        } else {
          document.getElementById("search-feedback").innerText = "";
          filteredVets.forEach(vet => {
            const li = document.createElement("li");
            li.classList.add("highlight");
            li.innerHTML = `
              <ul>
                <li>Name: ${vet.name}</li>
                <li>Specialty: ${vet.specialty}</li>
                <li>Location: ${vet.location}</li>
                <li>Phone: ${vet.contact}</li>
              </ul>
            `;
            vetList.appendChild(li);
          });
        }
      });
  });

  displayVets(); // load on page start
});
