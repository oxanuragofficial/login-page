document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // Standard Form Submission Validation
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop default browser reloading

    // 1. Basic HTML5 validation check
    if (!form.checkValidity()) {
      alert("Please fill in all fields correctly and agree to the Terms.");
      return;
    }

    // 2. Custom Password Matching Check
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      confirmPassword.focus();
      return;
    }

    // 👉 NEW: Inputs se values fetch karna aur clean karna
    const emailValue = document.getElementById("email").value.trim();
    const fullNameValue = document.getElementById("name").value.trim();
    const usernameValue = document.getElementById("username").value.trim();

    // 3. 👉 NEW: Pehle se save kiye huye users ko LocalStorage se nikalna
    let registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 4. 👉 NEW: Duplicate Check (Kya is email se pehle hi account bana hua hai?)
    const userExists = registeredUsers.some(user => user.email === emailValue);
    if (userExists) {
      alert("This email is already registered! Please log in.");
      return;
    }

    // 5. Successful Validation Payload Creation
    const registrationData = {
      fullName: fullNameValue,
      username: usernameValue,
      email: emailValue, // Aapka index.js isi key ko read karega
      password: password.value, 
    };

    // 6. 👉 NEW: Naye user ko array me add karna aur database me push karna
    registeredUsers.push(registrationData);
    localStorage.setItem("users", JSON.stringify(registeredUsers));

    alert(`Account created successfully for ${registrationData.fullName}!`);
    console.log("Registration Payload:", registrationData);
    
    form.reset();

    // 7. 👉 NEW: Account bante hi user ko direct login window (index.html) par bhejein
    window.location.href = "index.html";
  });

  // Social Authentication Mock Handlers
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      alert("Redirecting to Google OAuth authentication...");
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener("click", () => {
      alert("Redirecting to GitHub OAuth authentication...");
    });
  }
});
