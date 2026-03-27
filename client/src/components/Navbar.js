import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      setUser({ username });
    }

    // 🔔 Fetch notification count
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setCount(data.length))
      .catch(err => console.log(err));

  }, []);

  // 🔐 Protected navigation
  const handleNavigate = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        ANGANCARE
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">

        <li onClick={() => navigate("/")}>{t("home")}</li>

        <li onClick={() => handleNavigate("/attendance")}>
          {t("attendance")}
        </li>

        <li onClick={() => handleNavigate("/growth")}>
          {t("growth")}
        </li>

        <li onClick={() => handleNavigate("/report")}>
          {t("report")}
        </li>

        {/* 🔔 Notification */}
        <li
          onClick={() => handleNavigate("/notification")}
          style={{ position: "relative" }}
        >
          🔔 {t("notification")}
          {count > 0 && <span className="badge">{count}</span>}
        </li>

        {/* Profile */}
        <li onClick={() => handleNavigate("/profile")}>
          {t("profile")}
        </li>

        {/* Settings */}
        <li onClick={() => handleNavigate("/settings")}>
          {t("settings")}
        </li>

      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-buttons">

        {user ? (
          <div className="user-box">
            <span>{user.username}</span>
            <button onClick={logout}>
              {t("logout")}
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate("/teacher-register")}>
              Get Started
            </button>

            <button onClick={() => navigate("/login")}>
              {t("login")}
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;