// src/components/MainNavbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/MainNavbar.css";

export default function MainNavbar() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="main-navbar">
      <div className="nav-brand">🍴 FoodCourt</div>
      <ul className="nav-links">
        {userType === "admin" ? (
          <>
            <li><Link to="/admin/menu">Menu</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/profile">Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/menu/breakfast">Breakfast</Link></li>
            <li><Link to="/menu/snacks">Snacks</Link></li>
            <li><Link to="/menu/meals">Meals</Link></li>
            <li><Link to="/menu/egg-items">Egg</Link></li>
            <li><Link to="/menu/chicken-items">Chicken</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}