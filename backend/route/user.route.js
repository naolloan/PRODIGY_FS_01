const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const userController = require("../controller/user.controller");

// Register user (expects username, email, password, role)
router.post("/register", userController.register);

// Login user (expects email, password)
router.post("/login", userController.login);

// forgot-password (expects email)
router.post('/forgot-password', userController.forgotPassword);

// reset-password (expects email, reseCode, newPassword)
router.post('/reset-password', userController.resetPassword);

// Delete user
router.delete("/delete", authenticate, userController.deleteAccount);

router.get("/", authenticate, authorizeAdmin, userController.viewUsers);

module.exports = router;
