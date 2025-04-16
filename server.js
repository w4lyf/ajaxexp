const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const existingUsers = ["student101", "Abhinav"]; // Simulated database

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/verify-user", (req, res) => {
  const { fullName } = req.body;
  const isAvailable = !existingUsers.includes(fullName);
  res.json({ available: isAvailable });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});