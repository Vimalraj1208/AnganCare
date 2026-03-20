import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotificationPage.css";

function NotificationPage() {

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // 🔥 FETCH FROM DB
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div className="attendance-container">

      <h2>Notifications</h2>

      {/* 🔥 4 CARDS (TOP) */}
      <div className="attendance-grid">

        <div className="attendance-card" onClick={() => navigate("/send/info")}>
          <div className="icon">📢</div>
          <h3>Information</h3>
          <p>Holiday, events</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/food")}>
          <div className="icon">🥚</div>
          <h3>Food</h3>
          <p>Nutrition updates</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/admin")}>
          <div className="icon">📊</div>
          <h3>Admin</h3>
          <p>Reports</p>
        </div>

        <div className="attendance-card" onClick={() => navigate("/send/parent")}>
          <div className="icon">👨‍👩‍👧</div>
          <h3>Parent</h3>
          <p>Parent updates</p>
        </div>

      </div>

      {/* 🔥 DB NOTIFICATIONS BELOW */}
      <h3 style={{ marginTop: "40px" }}>Recent Notifications</h3>

      <div className="attendance-grid">

        {notifications.length === 0 ? (
          <p>No notifications 😴</p>
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