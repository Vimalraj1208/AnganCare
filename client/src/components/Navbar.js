import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  // check login token
  const token = localStorage.getItem("token");

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <h2>ANGANCARE</h2>
      </div>

      {/* Menu Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/growth">Growth</Link></li>
        <li><Link to="/report">Report</Link></li>
        <li><Link to="/notification">Notification</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      {/* Buttons */}
      <div className="navbar-buttons">

        {/* Show Get Started only if NOT logged in */}
        {!token && (
          <Link to="/register">
            <button className="get-started">
              Get Started
            </button>
          </Link>
        )}

        {/* Login / Logout */}
        {token ? (
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;