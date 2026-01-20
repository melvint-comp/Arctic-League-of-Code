async function predict() {
  const entity = document.getElementById("entity").value;
  const year = document.getElementById("year").value;

  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity, year })
  });

  const data = await res.json();
  renderChart(data.years, data.values);

  document.getElementById("insight").innerText =
    `By ${year}, predicted energy consumption per capita is ${data.values.slice(-1)[0].toFixed(2)} kWh/person.`;
}

function renderChart(labels, values) {
  const ctx = document.getElementById("chart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Energy Consumption per Capita (kWh)",
        data: values,
        borderWidth: 2
      }]
    }
  });
}
