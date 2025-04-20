const usernameInput = document.getElementById("username");
const passInput = document.getElementById("pass");
const confirmPassInput = document.getElementById("confirmPass");
const passStatus = document.getElementById("passStatus");
const userStatus = document.getElementById("userStatus");
const statusMessage = document.getElementById("statusMessage");
const form = document.getElementById("enrollForm");

// COLLEGE AUTO-SUGGESTIONS
const institutes = ["VESIT", "MIT", "IIT", "VIT", "NIIT", "IISC", "IISR", "COEP", "SPIT", "BITS"];
const instituteInput = document.getElementById("institute");
const suggestionsDiv = document.getElementById("instituteSuggestions");

instituteInput.addEventListener("input", () => {
  const query = instituteInput.value.toLowerCase();
  suggestionsDiv.innerHTML = "";
  if (query.length === 0) return;

  const matches = institutes.filter(inst => inst.toLowerCase().includes(query));
  matches.forEach(inst => {
    const div = document.createElement("div");
    div.textContent = inst;
    div.classList.add("suggestion");
    div.onclick = () => {
      instituteInput.value = inst;
      suggestionsDiv.innerHTML = "";
    };
    suggestionsDiv.appendChild(div);
  });
});

// USERNAME AVAILABILITY CHECK
usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  if (!username) {
    userStatus.textContent = "";
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/verify-user", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      userStatus.style.color = response.available ? "green" : "red";
      userStatus.textContent = response.available ? "Username available" : "Username already taken!";
    }
  };
  xhr.send(JSON.stringify({ username }));
});

// PASSWORD MATCH VALIDATION via POST
function validatePasswordMatch() {
  const password = passInput.value;
  const confirmPassword = confirmPassInput.value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/verify-password", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      passStatus.style.color = response.match ? "green" : "red";
      passStatus.textContent = response.match ? "Passwords match" : "Passwords do not match";
    }
  };
  xhr.send(JSON.stringify({ password, confirmPassword }));
}

passInput.addEventListener("input", validatePasswordMatch);
confirmPassInput.addEventListener("input", validatePasswordMatch);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passInput.value;
  const confirmPassword = confirmPassInput.value;
  const fullName = document.getElementById("fullName").value;
  const institute = document.getElementById("institute").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && response.success) {
        statusMessage.style.color = "green";
        statusMessage.textContent = "Successfully Registered!";
        form.reset();
        userStatus.textContent = "";
        passStatus.textContent = "";
      } else {
        statusMessage.style.color = "red";
        statusMessage.textContent = (response.message || "Registration failed");
      }
    }
  };
  xhr.send(JSON.stringify({ username, password, confirmPassword, fullName, institute }));
});
