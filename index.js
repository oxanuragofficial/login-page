function formFunction(event) {
  event.preventDefault(); // Form ko refresh hone se rokne ke liye
  
  let form = document.getElementById('loginForm');
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let remember = document.getElementById('remember').checked;
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email address');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Remember me:', remember);
  
  alert('Login successful! Redirecting to dashboard...');
  
  // 👉 Yeh line add ki hai jo aapke calculator page par le jayegi
  window.location.href = 'https://github.io'; 
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  if (form) {
    form.onsubmit = formFunction;
  }
});
