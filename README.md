# PRODIGY_FS_01

# Authentication Frontend (HTML + Bootstrap)

This project is a simple and elegant frontend user authentication system built using **HTML**, **Bootstrap 5**, and **Vanilla JavaScript**. It connects to a backend running at `http://localhost:5000` for user registration, login, password reset, and role-based redirection.

 🚀 Features

 ✅ User Registration with role selection (user or admin)
 ✅ User Login with JWT authentication
 ✅ Forgot Password + Reset Password flow
 ✅ Role-based redirection (`admin` → dashboard, `user` → home)
 ✅ Token storage in `localStorage`
 ✅ Form validations and error handling
 ✅ Beautiful, modern UI using Bootstrap

🛠️ Setup Instructions

1. Ensure backend is running on `http://localhost:5000`

   * `/users/register` → `POST`
   * `/users/login` → `POST`
   * `/users/forgot-password` → `POST`
   * `/users/reset-password` → `POST`
   * `/users/delete` → `DELETE`
   * `/users/` → `GET`

2. Run frontend locally:
   You can use Live Server in VS Code or open any HTML file via your browser:

   http://127.0.0.1:5500/frontend/index.html

3. Testing the Flow:

   * Register as `admin` or `user`
   * Log in and verify redirection
   * Test forgot/reset password functionality

🔒 Token Handling

* JWT token is saved to `localStorage`
* Used later for protected routes (e.g., dashboard)

🧰 Dependencies

* [Bootstrap 5](https://getbootstrap.com/)
* No external JS frameworks required

