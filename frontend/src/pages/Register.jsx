// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import "../styles/FormPage.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "customer",
    phoneNumber: "",
    favouriteCuisine: "",
    stallName: "",
    specialty: "",
    licenseNumber: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password || form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (form.userType === "customer" && !form.favouriteCuisine.trim())
      newErrors.favouriteCuisine = "Favourite cuisine is required";
    if (form.userType === "admin") {
      if (!form.stallName.trim()) newErrors.stallName = "Stall name is required";
      if (!form.specialty.trim()) newErrors.specialty = "Specialty is required";
      if (!form.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await API.post("/api/auth/register", form);
      alert(`Welcome, ${res.data.fullName || form.fullName}!`);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
      console.error("Register error:", err.response?.data || err);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
        {errors.fullName && <small style={{ color: "red" }}>{errors.fullName}</small>}

        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}

        <select name="userType" value={form.userType} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin (Vendor)</option>
        </select>

        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber && <small style={{ color: "red" }}>{errors.phoneNumber}</small>}

        {form.userType === "customer" && (
          <>
            <input name="favouriteCuisine" placeholder="Favourite Cuisine" value={form.favouriteCuisine} onChange={handleChange} />
            {errors.favouriteCuisine && <small style={{ color: "red" }}>{errors.favouriteCuisine}</small>}
          </>
        )}

        {form.userType === "admin" && (
          <>
            <input name="stallName" placeholder="Stall Name" value={form.stallName} onChange={handleChange} />
            {errors.stallName && <small style={{ color: "red" }}>{errors.stallName}</small>}

            <input name="specialty" placeholder="Specialty" value={form.specialty} onChange={handleChange} />
            {errors.specialty && <small style={{ color: "red" }}>{errors.specialty}</small>}

            <input name="licenseNumber" placeholder="License Number" value={form.licenseNumber} onChange={handleChange} />
            {errors.licenseNumber && <small style={{ color: "red" }}>{errors.licenseNumber}</small>}
          </>
        )}

        <button type="submit">Register</button>

        <p style={{ textAlign: "center" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#f27c38", fontWeight: "bold", textDecoration: "none" }}>
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}