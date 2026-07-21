function formFunction(event) {
  event.preventDefault(); // Form ko automatic reload hone se rokne ke liye
  
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value;
  let remember = document.getElementById('remember').checked;
  let errorAlert = document.getElementById('errorAlert'); // Error container ka reference
  
  // Naya validation start hone se pehle purane alert ko hide karein
  if (errorAlert) {
    errorAlert.style.display = 'none';
  }

  // 1. Basic empty fields validation
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  // 2. Format verification checking
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address');
    return;
  }
  
  // 3. Password character minimum length requirement
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  // 4. LocalStorage se user database fetch karna
  let registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

  // 👉 FIXED: pure array me exact user object ko find karein (Email match karne ke liye)
  let foundUser = registeredUsers.find(user => user.email === email);

  // 5. Verification: Check karein ki user email registered list me hai ya nahi
  if (!foundUser) {
    // Agar user database me nahi hai, toh red screen banner default innerHTML ke sath dikhayein
    if (errorAlert) {
      errorAlert.innerHTML = 'User not found! Please <a href="register.html" style="color: #d91e1e; font-weight: bold; text-decoration: underline;">Register First</a>.';
      errorAlert.style.display = 'block';
    } else {
      alert('User not found! Please register first.');
    }
    return; 
  }
  
  // 👉 ADDED LOGIC: Ab check karein ki password sahi hai ya nahi
  if (foundUser.password !== password) {
    if (errorAlert) {
      // Error message ko password warning me change karein
      errorAlert.innerHTML = 'Incorrect Password! Please try again.';
      errorAlert.style.display = 'block';
    } else {
      alert('Incorrect Password! Please try again.');
    }
    return; // Wrong password hone par code ko aage badhne se rokein
  }
  
  // Console logging information
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Remember me:', remember);
  
  // Optional: Remember me true hone par active login status save karein
  if (remember) {
    localStorage.setItem('isLoggedIn', 'true');
  }

  alert('Login successful! Redirecting to dashboard...');
  
  // Verified route: Aapke application server dashboard ya calculator page redirection url
  window.location.href = 'https://oxanuragofficial.github.io/web-calculator/'; 
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.onsubmit = formFunction;
  }

  // Input listener: Jaise hi user wapas typing shuru kare (Email ya Password), red error banner hide ho jaye
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorAlert = document.getElementById('errorAlert');
  
  if (errorAlert) {
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        errorAlert.style.display = 'none';
      });
    }
    if (passwordInput) {
      passwordInput.addEventListener('input', function() {
        errorAlert.style.display = 'none';
      });
    }
  }
});
