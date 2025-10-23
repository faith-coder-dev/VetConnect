document.addEventListener("DOMContentLoaded", () => {
  const vetList = document.getElementById("vet-list");
  const form = document.getElementById("search-form");
  const feedback = document.getElementById("search-feedback");
  const locationSelect = document.getElementById("location");
  const specialtySelect = document.getElementById("specialty");
  

  let allVets = [];

  function loadVets() {
    fetch("http://localhost:3000/vets")
      .then(r => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then(data => {
        allVets = Array.isArray(data) ? data : [];
        renderVets(allVets);
       
      })
      .catch(err => {
        console.error("Fetch error:", err);
        vetList.innerHTML = `<div class="no-results"><h3>Couldn't load vets</h3><p>Please ensure your json-server is running on <code>http://localhost:3000</code></p><button onclick="location.reload()">Retry</button></div>`;
      });
  }

  
  function renderVets(vets) {
    vetList.innerHTML = "";
    if (!vets || vets.length === 0) {
      vetList.innerHTML = `
        <div class="no-results" role="status">
          <h3>No vets found for that search.</h3>
          <p>Try a different location or specialty.</p>
          <div style="margin-top:16px">
            <button id="no-results-ok">OK</button>
          </div>
        </div>`;
      document.getElementById("no-results-ok").addEventListener("click", () => {
        
        specialtySelect.value = "";
        locationSelect.value = "";
        feedback.textContent = "";
        renderVets(allVets);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      return;
    }

   
    vetList.style.justifyItems = vets.length === 1 ? "center" : "stretch";

    vets.forEach(vet => {
      const li = document.createElement("li");
      li.className = "vet-card";

      
      const media = document.createElement("div");
      media.className = "card-media";
      const img = document.createElement("img");
      img.src = vet.image || "";
      img.alt = vet.name || "Veterinarian";
      media.appendChild(img);

      const info = document.createElement("div");
      info.className = "vet-info";
      info.innerHTML = `<h3>${vet.name}</h3>
                        <p>${vet.specialty || ""}</p>
                        <p><strong>${vet.location || ""}</strong></p>`;

      const actions = document.createElement("div");
      actions.className = "card-actions";
      const contactBtn = document.createElement("button");
      contactBtn.className = "contact-btn";
      contactBtn.textContent = "Contact";
      contactBtn.addEventListener("click", () => {
        const contact = vet.contact || vet.phone || "No contact";
        alert(`Contact ${vet.name}: ${contact}`);
      });

      const okBtn = document.createElement("button");
      okBtn.className = "ok-btn";
      okBtn.textContent = "OK";
      okBtn.addEventListener("click", () => {
        
        document.querySelectorAll(".vet-card").forEach(c => c.classList.remove("highlight"));
        li.classList.add("highlight");

        vetList.style.justifyItems = "center";
       
        li.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      actions.appendChild(contactBtn);
      actions.appendChild(okBtn);

      li.appendChild(media);
      li.appendChild(info);
      li.appendChild(actions);

      vetList.appendChild(li);
    });
  }

  function applyFilters(e) {
    if (e) e.preventDefault();
    const loc = locationSelect.value.trim().toLowerCase();
    const spec = specialtySelect.value.trim().toLowerCase();

    const filtered = allVets.filter(v => {
      const matchesLoc = loc ? (v.location || "").toLowerCase() === loc : true;
      const matchesSpec = spec ? (v.specialty || "").toLowerCase().includes(spec) : true;
      return matchesLoc && matchesSpec;
    });

 
    document.querySelectorAll(".vet-card").forEach(c => c.classList.remove("highlight"));

    if (filtered.length === 0) {
      feedback.textContent = "No vets available in this selection.";
    } else {
      feedback.textContent = "";
    }

    renderVets(filtered);
  }

  form.addEventListener("submit", applyFilters);

  locationSelect.addEventListener("change", applyFilters);
  specialtySelect.addEventListener("change", applyFilters);


  loadVets(
    
  );

}
);
