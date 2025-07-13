async function simulate() {
  const algorithm = document.getElementById("algorithm").value;
  const pages = document.getElementById("pages").value.split(",").map(Number);
  const frames = parseInt(document.getElementById("frames").value);

  const res = await fetch("http://localhost:3000/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ algorithm, pages, frames })
  });

  const data = await res.json();
  const outputDiv = document.getElementById("output");

  // Clear previous output
  outputDiv.innerHTML = "";

  // Create table
  const table = document.createElement("table");
  table.className = "output-table";

  // Header row
  const header = document.createElement("tr");
  header.innerHTML = `<th>Step</th><th>Page</th>${[...Array(frames).keys()].map(i => `<th>Frame ${i + 1}</th>`).join("")}<th>Status</th>`;
  table.appendChild(header);

  // Each step row
  data.steps.forEach((step, i) => {
    const prevFrames = i > 0 ? data.steps[i - 1].frames : null;

    const row = document.createElement("tr");
    row.className = step.hit ? "hit" : "miss";
    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${step.page}</td>
    ${step.frames.map((f, idx) => `
      <td class="${prevFrames && prevFrames[idx] !== f ? 'changed' : ''}">
        ${f !== -1 ? f : ""}
      </td>
    `).join("")}
    <td>${step.hit ? "✅ Hit" : "❌ Miss"}</td>
  `;
    table.appendChild(row);
  });

  const hits = data.steps.filter(step => step.hit).length;
  const hitRate = ((hits / data.steps.length) * 100).toFixed(1);

  const summary = document.createElement("div");
  summary.className = "summary-card";
  summary.innerHTML = `
  <h3>📊 Performance</h3>
  <p>Hit Rate: <strong>${hitRate}%</strong></p>
  <p>Total Hits: ${hits} | Misses: ${data.steps.length - hits}</p>
`;
  outputDiv.prepend(summary);

  outputDiv.appendChild(table);

  const timeline = document.createElement("div");
  timeline.className = "timeline";
  timeline.innerHTML = `
  <h3>⏳ Frame Usage Timeline</h3>
  <div class="frames">
    ${data.steps.map(step => `
      <div class="step">
        ${step.frames.map(f => `
          <div class="frame ${f !== -1 ? 'active' : ''}">
            ${f !== -1 ? f : ''}
          </div>
        `).join("")}
      </div>
    `).join("")}
  </div>
`;
  outputDiv.appendChild(timeline);
}

const exportBtn = document.createElement("button");
exportBtn.className = "export-btn";
exportBtn.textContent = "📥 Export as CSV";
exportBtn.onclick = () => {
  const csvContent = [
    "Step,Page," + [...Array(frames).keys()].map(i => `Frame ${i+1}`).join(",") + ",Status",
    ...data.steps.map((step, i) => 
      `${i+1},${step.page},${step.frames.join(",")},${step.hit ? "Hit" : "Miss"}`
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${algorithm}_simulation.csv`;
  a.click();
};

outputDiv.appendChild(exportBtn);g