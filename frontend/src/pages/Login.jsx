// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import "../styles/FormPage.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    userType: "customer"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", form);

      // ✅ Save JWT token and user info
      localStorage.setItem("token", res.data.token);         // ✅ token
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("fullName", res.data.fullName || "");

      alert(`Welcome back, ${res.data.fullName || "user"}!`);
      navigate("/home");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", err.response?.data || err);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <select name="userType" value={form.userType} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin (Vendor)</option>
        </select>
        <button type="submit">Login</button>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          New here?{" "}
          <Link to="/" style={{ color: "#f27c38", textDecoration: "none", fontWeight: "bold" }}>
            Register instead
          </Link>
        </p>
      </form>
    </div>
  );
}
