import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/VendorNavbar.css";

export default function VendorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="vendor-navbar">
      <div className="nav-logo">👨‍🍳 Vendor Dashboard</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/tokens">Tokens</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}