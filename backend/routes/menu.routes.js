import express from "express";
import multer from "multer";
import {
  addMenuItem,
  getMenuByCategory,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

// configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ This route MUST be defined
router.post("/", upload.single("image"), addMenuItem);

router.get("/:category", getMenuByCategory);
router.put("/:id", upload.single("image"), updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
