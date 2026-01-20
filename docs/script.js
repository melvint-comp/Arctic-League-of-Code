/* -----------------------
   MAP INITIALIZATION
------------------------ */

const map = L.map("map", {
  zoomControl: false
}).setView([15, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

/* -----------------------
   AUTOCOMPLETE DATA
------------------------ */

// Example list — replace or expand as needed
const countryList = [
  "Malaysia", "Singapore", "Indonesia", "Thailand",
  "Vietnam", "China", "India", "Japan",
  "United States", "Canada", "Brazil",
  "Germany", "France", "United Kingdom",
  "South Africa", "Nigeria", "Kenya", "Australia"
];

// Populate datalist
const datalist = document.getElementById("countries");
countryList.forEach(c => {
  const option = document.createElement("option");
  option.value = c;
  datalist.appendChild(option);
});

/* -----------------------
   ANALYSIS CALL
------------------------ */

async function runPrediction() {
  const entity = document.getElementById("entity").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity, model, year })
  });

  const data = await res.json();

  showMarker(data.location);
}

/* -----------------------
   MAP MARKER
------------------------ */

function showMarker(loc) {
  map.setView([loc.lat, loc.lon], 4);

  L.marker([loc.lat, loc.lon])
    .addTo(map)
    .bindPopup(`<strong>${loc.entity}</strong><br/>Energy Analysis Loaded`)
    .openPopup();
}
