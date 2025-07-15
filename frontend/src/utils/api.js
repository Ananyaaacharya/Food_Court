// src/utils/api.js

import axios from "axios";

// 🔗 Correct baseURL to match your backend routes
const API = axios.create({
  baseURL: "http://localhost:5000", // ✅ backend exposes /menu and /api/auth directly
  withCredentials: true             // ✅ needed if you're using cookies/session later
});

export default API;