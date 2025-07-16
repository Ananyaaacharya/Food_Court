// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔌 Connect to MongoDB
connectDB();

// 🔐 Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Serve image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📦 Routes
app.use("/api/auth", authRoutes);
app.use("/menu", menuRoutes); // All menu endpoints start with /menu

// ✅ Health check
app.get("/", (req, res) => res.send("🚀 Food Court API is running"));

// ▶️ Start server
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
