// backend/models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ["admin", "customer"], required: true },
    phoneNumber: Number,
    favouriteCuisine: String,
    stallName: String,
    specialty: String,
    licenseNumber: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);