import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <nav className="header-container">
            <div className="header-brand">
                <h1>Airline Services</h1>
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
