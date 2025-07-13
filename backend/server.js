const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const runAlgorithm = require("./memoryManager");

app.use(cors());
app.use(express.json());

app.post("/simulate", (req, res) => {
  const { algorithm, pages, frames } = req.body;
  const result = runAlgorithm(algorithm, pages, frames);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});