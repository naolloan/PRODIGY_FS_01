window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const roleInfo = document.getElementById('roleInfo');
  if (roleInfo) {
    roleInfo.textContent = `You are logged in as: ${payload.role}`;
  }
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
});