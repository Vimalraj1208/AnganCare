import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Dashboard.css";

function Attendance() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="attendance-page">

      <h2 className="attendance-title">
        {t("attendance_title")}
      </h2>

      <div className="attendance-grid">

        {/* ADD STUDENT */}
        <div
          className="attendance-card"
          onClick={() => navigate("/add-student")}
        >
          <div className="card-icon">👶</div>

          <h3>{t("add_student")}</h3>

          <p>{t("register_child")}</p>
        </div>

        {/* ATTENDANCE MARKER */}
        <div
          className="attendance-card"
          onClick={() => navigate("/attendance-marker")}
        >
          <div className="card-icon">📷</div>

          <h3>{t("attendance_marker")}</h3>

          <p>{t("face_attendance")}</p>
        </div>

        {/* DASHBOARD */}
        <div
          className="attendance-card"
          onClick={() => navigate("/attendance-dashboard")}
        >
          <div className="card-icon">📊</div>

          <h3>{t("dashboard")}</h3>

          <p>{t("attendance_stats")}</p>
        </div>

        {/* STUDENT LIST */}
        <div
          className="attendance-card"
          onClick={() => navigate("/students-list")}
        >
          <div className="card-icon">📋</div>

          <h3>{t("student_list")}</h3>

          <p>{t("view_students")}</p>
        </div>

      </div>

    </div>
  );
}

export default Attendance;