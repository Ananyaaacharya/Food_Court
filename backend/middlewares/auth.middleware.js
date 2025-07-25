// backend/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "secret");
    req.user = decoded; // decoded token will contain { id, userType }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
