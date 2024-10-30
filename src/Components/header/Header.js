// Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { currentUser, userRole, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
          {currentUser ? (
            <>
              <li>
                {currentUser.displayName} ({userRole})
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={loginWithGoogle}>Login</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
