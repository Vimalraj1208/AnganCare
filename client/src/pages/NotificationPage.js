import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/NotificationPage.css";

function NotificationPage() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([]);

  // 🔥 FETCH FROM DB
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="attendance-container">

      {/* TITLE */}
      <h2>{t("notifications")}</h2>

      {/* 🔥 TOP CARDS */}
      <div className="attendance-grid">

        <div className="attendance-card" onClick={() => navigate("/send/info")}>
          <div className="icon">📢</div>
          <h3>{t("information")}</h3>
          <p>{t("info_desc") || "Holiday, events"}</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/food")}>
          <div className="icon">🥚</div>
          <h3>{t("food")}</h3>
          <p>{t("food_desc") || "Nutrition updates"}</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/admin")}>
          <div className="icon">📊</div>
          <h3>{t("admin")}</h3>
          <p>{t("admin_desc") || "Reports"}</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/parent")}>
          <div className="icon">👨‍👩‍👧</div>
          <h3>{t("parent")}</h3>
          <p>{t("parent_desc") || "Parent updates"}</p>
        </div>

      </div>

      {/* 🔥 RECENT */}
      <h3 style={{ marginTop: "40px" }}>
        {t("recent_notifications")}
      </h3>

      <div className="attendance-grid">

        {notifications.length === 0 ? (
          <p>{t("no_notifications")} 😴</p>
        ) : (
          notifications.map((n, i) => (
            <div className="attendance-card" key={i}>

              <div className="icon">
                {n.type === "info" && "📢"}
                {n.type === "food" && "🥚"}
                {n.type === "admin" && "📊"}
                {n.type === "parent" && "👨‍👩‍👧"}
              </div>

              <h3>{n.title}</h3>
              <p>{n.msg}</p>

              <small style={{ color: "gray" }}>
                {new Date(n.createdAt).toLocaleString()}
              </small>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default NotificationPage;