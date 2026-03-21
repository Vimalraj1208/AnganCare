import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  // ==============================
  // 🔥 LOAD LANGUAGE ON START
  // ==============================
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // ==============================
  // 🔥 USER + NOTIFICATION
  // ==============================
  useEffect(() => {

    const username = localStorage.getItem("username");

    if (username) {
      setUser({ username });
    }

    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setCount(data.length))
      .catch(err => console.log(err));

  }, []);

  // ==============================
  // 🔐 NAVIGATION
  // ==============================
  const handleNavigate = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  // ==============================
  // 🌐 LANGUAGE SWITCH
  // ==============================
  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  // ==============================
  // 🔓 LOGOUT
  // ==============================
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        ANGANCARE
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">

        <li onClick={() => navigate("/")}>{t("home")}</li>
        <li onClick={() => handleNavigate("/attendance")}>{t("attendance")}</li>
        <li onClick={() => handleNavigate("/growth")}>{t("growth")}</li>
        <li onClick={() => handleNavigate("/report")}>{t("report")}</li>

        {/* 🔔 NOTIFICATION */}
        <li
          onClick={() => handleNavigate("/notification")}
          style={{ position: "relative" }}
        >
          🔔 {t("notification")}

          {count > 0 && (
            <span className="badge">{count}</span>
          )}
        </li>

        <li onClick={() => handleNavigate("/settings")}>
          {t("settings")}
        </li>

      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-buttons">

        {/* 🌐 LANGUAGE SWITCH */}
        <div className="lang-switch">
          <button onClick={() => changeLang("en")}>EN</button>
          <button onClick={() => changeLang("ta")}>TA</button>
        </div>

        {/* 👤 USER */}
        {user ? (
          <div className="user-box">
            <span>{user.username}</span>
            <button onClick={logout}>
              {t("logout")}
            </button>
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>
            {t("login")}
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;