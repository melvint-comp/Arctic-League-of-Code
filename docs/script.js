const map = L.map("map", {
  zoomControl: false
}).setView([10, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let marker;

const countries = [
  "Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines",
  "Vietnam", "India", "China", "Japan", "South Korea",
  "United States", "Canada", "Brazil", "Germany", "France",
  "United Kingdom", "Australia"
];

const input = document.getElementById("entity");
const suggestionsBox = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!value) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = countries.filter(c =>
    c.toLowerCase().startsWith(value)
  );

  matches.forEach(country => {
    const div = document.createElement("div");
    div.className = "suggestion";
    div.innerText = country;
    div.onclick = () => {
      input.value = country;
      suggestionsBox.style.display = "none";
    };
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = matches.length ? "block" : "none";
});

/* ---------------- Prediction ---------------- */
async function runPrediction() {
  const entity = input.value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;

  if (!entity) return;

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity, model, year })
  });

  const data = await res.json();

  if (marker) marker.remove();
  marker = L.marker([data.location.lat, data.location.lon])
    .addTo(map)
    .bindPopup(entity)
    .openPopup();

  map.setView([data.location.lat, data.location.lon], 4);
}
