
let flights = [
  { number: "PR101", destination: "Tokyo", duration: 4, status: "On Time" },
  { number: "SQ305", destination: "Singapore", duration: 3, status: "Delayed" },
  { number: "CX900", destination: "Hong Kong", duration: 2, status: "On Time" }
];

function updateDashboard() {
  document.getElementById("flight-count").innerText = flights.length;
  document.getElementById("delayed-count").innerText = flights.filter(f => f.status === "Delayed").length;
  document.getElementById("destination-count").innerText = [...new Set(flights.map(f => f.destination))].length;
  document.getElementById("today-date").innerText = new Date().toDateString();
}

function displayOutput(msg) {
  document.getElementById("output").innerText = msg;
}

function showAverageDuration() {
  if (!flights.length) return displayOutput("No flights available.");
  const total = flights.reduce((s, f) => s + f.duration, 0);
  const avg = (total / flights.length).toFixed(2);
  displayOutput(`Average Flight Duration: ${avg} hours`);
}
function showDelayedFlights() {
  const d = flights.filter(f => f.status === "Delayed");
  displayOutput(d.length ? d.map(f => `${f.number} → ${f.destination} (${f.duration}h)`).join("\n") : "No delayed flights.");
}
function showLongestFlight() {
  if (!flights.length) return displayOutput("No flights.");
  const longest = flights.reduce((m, f) => f.duration > m.duration ? f : m, flights[0]);
  displayOutput(`Longest Flight: ${longest.number} → ${longest.destination} (${longest.duration}h)`);
}
function showGroupedFlights() {
  const groups = {};
  flights.forEach(f => {
    if (!groups[f.destination]) groups[f.destination] = [];
    groups[f.destination].push(f.number);
  });
  let out = "";
  for (let dest in groups) out += `${dest}: ${groups[dest].join(", ")}\n`;
  displayOutput(out);
}
function fetchFlights() {
  displayOutput("Fetching new flights... please wait");
  setTimeout(() => {
    const newFlights = [
      { number: "UA450", destination: "Los Angeles", duration: 13, status: "On Time" },
      { number: "BA289", destination: "London", duration: 11, status: "Delayed" }
    ];
    flights = flights.concat(newFlights);
    updateDashboard();
    displayOutput("✅ New Flights Added:\n" + newFlights.map(f => `${f.number} → ${f.destination} (${f.duration}h) - ${f.status}`).join("\n"));
  }, 2000);
}

window.onload = updateDashboard;
