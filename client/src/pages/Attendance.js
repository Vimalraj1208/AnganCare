import React, { useState } from "react";
import "../styles/Attendance.css";
import FaceCapture from "../components/FaceCapture";
import AddStudentModal from "../components/AddStudentModal";
import AttendanceDashboard from "../components/AttendanceDashboard";
import StudentsList from "../components/StudentsList";

function Attendance() {

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const openFeature = (feature) => {
    setActiveFeature(feature);
  };

  return (

    <div className="attendance-page">

      <h2 className="attendance-title">Attendance Management</h2>

      <div className="feature-grid">

        <div
          className="feature-card"
          onClick={() => setShowAddStudent(true)}
        >
          <h3>➕ Add Student</h3>
          <p>Register new child & Capture photo</p>
        </div>

        <div
          className="feature-card"
          onClick={() => openFeature("ai")}
        >
          <h3>🤖 AI Attendance marking</h3>
          <p>Face recognition</p>
        </div>

        <div
          className="feature-card"
          onClick={() => openFeature("dashboard")}
        >
          <h3>📊 Dashboard</h3>
          <p>View attendance statistics</p>
        </div>

        <div
          className="feature-card"
          onClick={() => openFeature("students")}
        >
          <h3>👶 Students List</h3>
          <p>View registered children</p>
        </div>

      </div>

      <div className="feature-display">

        {activeFeature === "ai" && (
          <div className="feature-box">
            <h3>AI Face Attendance</h3>
            <FaceCapture />
          </div>
        )}

        {activeFeature === "dashboard" && (
          <div className="feature-box">
            <AttendanceDashboard />
          </div>
        )}

        {activeFeature === "students" && (
          <div className="feature-box">
            <StudentsList />
          </div>
        )}

      </div>

      {showAddStudent && (
        <AddStudentModal closeModal={() => setShowAddStudent(false)} />
      )}

    </div>

  );
}

export default Attendance;