import express from "express";
import {
  getMenuByCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

// 📦 GET menu items by category
router.get("/:category", getMenuByCategory);

// 🛠 Admin CRUD routes
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;