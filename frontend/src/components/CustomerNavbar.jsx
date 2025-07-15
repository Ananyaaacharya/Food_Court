// src/components/CustomerNavbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CustomerNavbar.css";

export default function CustomerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="customer-navbar">
      <div className="nav-logo">🧑‍🍽 Canteen Explorer</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}