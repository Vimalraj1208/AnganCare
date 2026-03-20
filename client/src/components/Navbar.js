import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {

    const username = localStorage.getItem("username");

    if (username) {
      setUser({ username });
    }

    // 🔥 FETCH NOTIFICATION COUNT
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setCount(data.length));

  }, []);

  const handleNavigate = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo" onClick={() => navigate("/")}>
        ANGANCARE
      </div>

      <ul className="nav-links">

        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => handleNavigate("/attendance")}>Attendance</li>
        <li onClick={() => handleNavigate("/growth")}>Growth</li>
        <li onClick={() => handleNavigate("/report")}>Report</li>

        {/* 🔔 NOTIFICATION */}
        <li
          onClick={() => handleNavigate("/notification")}
          style={{ position: "relative" }}
        >
          🔔 Notification

          {count > 0 && (
            <span className="badge">{count}</span>
          )}
        </li>

        <li onClick={() => handleNavigate("/profile")}>Settings</li>

      </ul>

      <div className="nav-buttons">

        {user ? (
          <div className="user-box">
            <span>{user.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;