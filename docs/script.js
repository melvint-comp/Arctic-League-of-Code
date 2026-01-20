let map = L.map("map").setView([10, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

async function runPrediction() {
  const entity = document.getElementById("entity").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ entity, model, year })
  });

  const data = await res.json();

  renderTrend(data.years, data.predictions);
  renderMix(data.energy_mix);
  renderMap(data.location);

  document.getElementById("insight").innerText = data.insight;
}

function renderTrend(labels, values) {
  new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "Energy per Capita (kWh)", data: values }]
    }
  });
}

function renderMix(mix) {
  new Chart(document.getElementById("energyMixChart"), {
    type: "pie",
    data: {
      labels: Object.keys(mix),
      datasets: [{ data: Object.values(mix) }]
    }
  });
}

function renderMap(loc) {
  L.marker([loc.lat, loc.lon]).addTo(map)
    .bindPopup(loc.entity)
    .openPopup();
  map.setView([loc.lat, loc.lon], 4);
}
