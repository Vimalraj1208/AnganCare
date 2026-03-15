import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Growth from "./pages/Growth";
import Report from "./pages/Report";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import TeacherRegister from "./pages/TeacherRegister";

// Components
import AddStudentModal from "./components/AddStudentModal";
import StudentsList from "./components/StudentsList";
import AIPoseAttendance from "./components/AIPoseAttendance";

function App() {
  return (
    <Router>

      {/* Navbar */}
      <Navbar />

      {/* Application Routes */}
      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/growth" element={<Growth />} />
        <Route path="/report" element={<Report />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />

        {/* Student Management */}
        <Route path="/add-student" element={<AddStudentModal />} />
        <Route path="/students-list" element={<StudentsList />} />

        {/* AI Attendance */}
        <Route path="/attendance-marker" element={<AIPoseAttendance />} />

      </Routes>

    </Router>
  );
}

export default App;