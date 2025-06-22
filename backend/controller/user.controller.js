const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user"); // Sequelize User model

// Register User
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Choose 'admin' or 'user'." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login User (by email)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "2h" }
    );

    res.json({ token, userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = code;
    await user.save();

    // Simulate sending the code
    console.log(`Reset code for ${email}: ${code}`);

    res.json({ message: "Reset code sent to your email." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, resetCode, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ where: { email, resetCode } });
    if (!user) {
      return res.status(400).json({ message: "Invalid code or email" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = null; // Clear the code after successful reset
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET /users
exports.viewUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role'],
      where: { role: 'user' }
    });

    res.json(users);
  } catch (err) {
    console.error('View Users Error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Delete user
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.destroy({ where: { id: userId } });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete account' });
  }
};


