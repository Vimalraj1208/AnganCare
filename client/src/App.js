import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Growth from "./pages/Growth";
import Report from "./pages/Report";
import NotificationPage from "./pages/NotificationPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import TeacherRegister from "./pages/TeacherRegister";
import StudentQR from "./pages/StudentQR";
import QRScanner from "./pages/QRScanner";
import Dashboard from "./pages/Dashboard";
import AttendanceDashboard from "./pages/AttendanceDashboard";
import FaceCapture from "./pages/FaceCapture";
import AttendanceMarker from "./pages/AttendanceMarker";
import SendNotification from "./pages/SendNotification";

// 🔥 NEW GROWTH PAGES
import Physical from "./pages/growth/Physical";
import Cognitive from "./pages/growth/Cognitive";
import Motor from "./pages/growth/Motor";
import Emotional from "./pages/growth/Emotional";
import Language from "./pages/growth/Language";

// Components
import AddStudentModal from "./components/AddStudentModal";
import StudentsList from "./components/StudentsList";
import AIPoseAttendance from "./components/AIPoseAttendance";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/growth" element={<Growth />} />
        <Route path="/report" element={<Report />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* 🔥 GROWTH MODULE ROUTES */}
        <Route path="/growth/physical" element={<Physical />} />
        <Route path="/growth/cognitive" element={<Cognitive />} />
        <Route path="/growth/motor" element={<Motor />} />
        <Route path="/growth/emotional" element={<Emotional />} />
        <Route path="/growth/language" element={<Language />} />

        {/* Email */}
        <Route path="/send/:type" element={<SendNotification />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />

        {/* Students */}
        <Route path="/add-student" element={<AddStudentModal />} />
        <Route path="/students-list" element={<StudentsList />} />
        <Route path="/face" element={<FaceCapture />} />

        {/* QR */}
        <Route path="/qr" element={<StudentQR />} />
        <Route path="/scan" element={<QRScanner />} />

        {/* AI */}
        <Route path="/attendance-marker" element={<AIPoseAttendance />} />
        <Route path="/face-marker" element={<AttendanceMarker />} />

      </Routes>
    </Router>
  );
}

export default App;