// backend/routes/auth.routes.js

import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile); // ✅ NEW route

export default router;
