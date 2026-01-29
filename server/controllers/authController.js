const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const TeamMember = require("../models/TeamMember");

// REGISTER
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword, role });

  if (role === "teamMember") {
    await TeamMember.create({ name, userId: user._id });
  }

  res.status(201).json({ message: "User registered" });
};

// LOGIN (combined admin + member)
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 🔹 Fix: remove path to make cookie available on all API requests
  const cookieName = user.role === "admin" ? "admin_token" : "member_token";

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({
    message: "Login success",
    user: { name: user.name, email: user.email, role: user.role }
  });
};

// LOGOUT
const logout = (req, res) => {
  const { role } = req.params;
  const cookieName = role === "admin" ? "admin_token" : "member_token";

  // No path → removes cookie from all routes
  res.clearCookie(cookieName);
  res.json({ message: `${role} logged out` });
};

module.exports = { register, login, logout };
