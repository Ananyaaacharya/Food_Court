// backend/controllers/auth.controller.js

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const {
      fullName, email, password, userType,
      phoneNumber, favouriteCuisine,
      stallName, specialty, licenseNumber
    } = req.body;

    if (!["admin", "customer"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName, email, password: hashedPassword, userType,
      phoneNumber, favouriteCuisine,
      stallName, specialty, licenseNumber
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, userType: savedUser.userType },
      process.env.TOKEN_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, fullName: savedUser.fullName, userType });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const user = await User.findOne({ email, userType });
    if (!user) return res.status(401).json({ message: "User not found or wrong type" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.TOKEN_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, fullName: user.fullName, userType });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// ✅ NEW: Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
