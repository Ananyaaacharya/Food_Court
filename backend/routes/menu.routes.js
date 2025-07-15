// backend/routes/menu.routes.js

import express from "express";
import multer from "multer";
import {
  getMenuByCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

// 🖼 Multer setup for image uploads (stored in /uploads)
const upload = multer({ dest: "uploads/" });

// 📦 GET menu items by category (accessible to all)
router.get("/:category", getMenuByCategory);

// 🛠 Admin routes with image support
router.post("/", upload.single("image"), addMenuItem);         // ➕ Add with image
router.put("/:id", upload.single("image"), updateMenuItem);    // ✏️ Update with image
router.delete("/:id", deleteMenuItem);                         // 🗑️ Delete without image

export default router;