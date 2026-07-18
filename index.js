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

  // 5. Verification: Check karein ki user email registered list me maujood hai ya nahi
  let userExists = registeredUsers.some(user => user.email === email);

  if (!userExists) {
    // Agar user database me nahi hai, toh red screen banner dikhayein
    if (errorAlert) {
      errorAlert.style.display = 'block';
    } else {
      alert('User not found! Please register first.');
    }
    return; // execution ko aage badhne se rokein
  }
  
  // Console logging information
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Remember me:', remember);
  
  alert('Login successful! Redirecting to dashboard...');
  
  // Verified route: Aapke application server dashboard ya calculator page redirection url
  window.location.href = 'https://github.io'; 
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.onsubmit = formFunction;
  }

  // Input listener: Jaise hi user wapas typing shuru kare, red error banner hide ho jaye
  const emailInput = document.getElementById('email');
  const errorAlert = document.getElementById('errorAlert');
  if (emailInput && errorAlert) {
    emailInput.addEventListener('input', function() {
      errorAlert.style.display = 'none';
    });
  }
});
