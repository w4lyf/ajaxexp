const takenUsername = ["student101", "Abhinav", "techlearner"]; // Simulated existing users

document.getElementById("enrollForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const institute = document.getElementById("institute").value.trim();
  const userID = document.getElementById("userID").value.trim().toLowerCase();
  const pass = document.getElementById("pass").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const status = document.getElementById("status");

  // Clear previous status
  status.textContent = "";

  // Check password confirmation
  if (pass !== confirmPass) {
    status.style.color = "red";
    status.textContent = "Passwords don't match!";
    return;
  }

  // Check for unique userID
  const nameExists = takenUsername.includes(fullName);
  if (nameExists) {
    status.style.color = "red";
    status.textContent = "User already taken!";
    return;
  }

  // Add new user to system
  takenUsername.push(userID);

  // Display success message
  status.style.color = "green";
  status.textContent = "Successfully Registered";

  document.getElementById("instituteSuggestions").innerHTML = "";
});

// Auto-suggest for institutes
const institutes = ["VESIT", "MIT", "IIT", "VIT", "NIIT", "IISC", "IISR", "COEP", "SPIT"];
const instituteInput = document.getElementById("institute");
const suggestionsDiv = document.getElementById("instituteSuggestions");

instituteInput.addEventListener("input", () => {
  const query = instituteInput.value.toLowerCase();
  suggestionsDiv.innerHTML = "";

  if (query.length === 0) return;

  const matches = institutes.filter(institute => institute.toLowerCase().includes(query));
  matches.forEach(institute => {
    const div = document.createElement("div");
    div.textContent = institute;
    div.classList.add("suggestion");
    div.onclick = () => {
      instituteInput.value = institute;
      suggestionsDiv.innerHTML = "";
    };
    suggestionsDiv.appendChild(div);
  });
});