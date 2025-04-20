const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const existingUsers = ["student101", "Abhinav"];
const registeredUsers = [];

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Username check
app.post("/verify-user", (req, res) => {
  const { username } = req.body;
  const isAvailable = !existingUsers.includes(username);
  res.json({ available: isAvailable });
});

// Password match check
app.post("/verify-password", (req, res) => {
  const { password, confirmPassword } = req.body;
  const match = password === confirmPassword;
  res.json({ match });
});

// Register user
app.post("/register", (req, res) => {
  const { username, password, confirmPassword, fullName, institute } = req.body;

  if (!username || !password || !confirmPassword || !fullName || !institute) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (existingUsers.includes(username)) {
    return res.status(400).json({ success: false, message: "Username taken" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  registeredUsers.push({ username, fullName, institute });
  existingUsers.push(username);

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
