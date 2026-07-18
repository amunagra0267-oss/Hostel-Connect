import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  const { _id, name, email, role, hostel, block, room, phone, gate, org } = user;
  return { id: _id, name, email, role, hostel, block, room, phone, gate, org };
}

// POST /api/auth/login  { email, password, role }
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "email, password and role are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase(), role });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user);
    res.json({ user: publicUser(user), token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// POST /api/auth/register  (used by seed script / admin onboarding, not the public login pages)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, ...extra } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "name, email, password, role are required" });
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password: hashed,
      role,
      ...extra,
    });

    const token = signToken(user);
    res.status(201).json({ user: publicUser(user), token });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

export default router;
