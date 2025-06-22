const baseUrl = 'http://localhost:5000/users';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          if (payload.role === 'admin') {
            window.location.href = 'dashboard.html';
          } else {
            window.location.href = 'home.html';
          }
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Server error');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      try {
        const res = await fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, role })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Registration successful');
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Server error');
      }
    });
  }
});