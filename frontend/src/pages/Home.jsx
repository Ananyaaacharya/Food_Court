// src/pages/Home.jsx

import React from "react";
import Carousel from "../components/Carousel";
import Menu from "../components/Menu";
import VendorNavbar from "../components/VendorNavbar";
import CustomerNavbar from "../components/CustomerNavbar";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType"); // "admin" or "customer"
  const name = localStorage.getItem("fullName");

  return (
    <div className="home-wrapper">
      {/* 👤 Show navbar based on role */}
      {userType === "admin" ? <VendorNavbar /> : <CustomerNavbar />}

      {/* 🎠 Carousel section */}
      <div className="home-carousel">
        <Carousel />
      </div>

      {/* 👋 Welcome text */}
      <div className="intro-section">
        <h2>Welcome{name ? `, ${name}` : ""} 👋</h2>
        {userType === "admin" ? (
          <p>Ready to manage your stall menu? Choose a category and customize items.</p>
        ) : (
          <p>Browse tasty options from your college canteen below!</p>
        )}
      </div>

      {/* 🍱 Menu categories */}
      <Menu />

      {/* 🛠 Role-based CTA */}
      <div className="footer-note">
        {userType === "admin" ? (
          <button onClick={() => navigate("/admin/menu")} className="btn btn-warning">
            Go to Menu Manager
          </button>
        ) : (
          <p style={{ fontStyle: "italic" }}>
            Tip: Add items to your cart from the menu pages.
          </p>
        )}
      </div>
    </div>
  );
}