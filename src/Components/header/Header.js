import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <nav className="header-container">
      <div className="header-brand">
        <Link to="/" className="header-logo">
          <img
            src="https://thumbs.dreamstime.com/z/aircraft-airplane-airline-logo-label-journey-air-travel-air-aircraft-airplane-airline-logo-label-journey-air-travel-airliner-122567381.jpg?w=768"
            alt="Airline Services Logo"
            className="logo-image"
          />
          <h1>Airline Services</h1>
        </Link>
      </div>
      <div className="header-links">
        <ul>
          <li>
            <Link to="/staff">Staff Dashboard</Link>
          </li>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
