// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 📦 Connect to MongoDB
connectDB();

// 🌐 CORS for frontend communication
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// 🔧 Parse incoming JSON
app.use(express.json());

// 📁 Mount routes
app.use("/api/auth", authRoutes);   // 🔐 Register & login
app.use("/menu", menuRoutes);       // 🍱 Item endpoints by category

// 🩺 Health check
app.get("/", (req, res) => {
  res.send("🚀 Food Court API is running");
});

// 🔊 Start server
app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});