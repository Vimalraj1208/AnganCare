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
import StudentQR from "./pages/StudentQR";
import QRScanner from "./pages/QRScanner";
import Dashboard from "./pages/Dashboard";
import AttendanceDashboard from "./pages/AttendanceDashboard";   // ✅ NEW
import FaceCapture from "./pages/FaceCapture";   // ✅ NEW  
import Settings from "./pages/Settings";   // ✅ NEW
// Components
import AddStudentModal from "./components/AddStudentModal";
import StudentsList from "./components/StudentsList";
import AIPoseAttendance from "./components/AIPoseAttendance";
import AttendanceMarker from "./pages/AttendanceMarker";   // ✅ NEW

function App() {

return (

<Router>

{/* Navbar */}

<Navbar />

{/* Routes */}

<Routes>

{/* Main Pages */}

<Route path="/" element={<Home />} />
<Route path="/attendance" element={<Attendance />} />
<Route path="/growth" element={<Growth />} />
<Route path="/report" element={<Report />} />
<Route path="/notification" element={<Notification />} />
<Route path="/profile" element={<Profile />} />
<Route path="/settings" element={<Settings />} />

{/* Dashboard */}

<Route path="/dashboard" element={<Dashboard />} />
<Route path="/attendance-dashboard" element={<AttendanceDashboard />} />

{/* Authentication */}

<Route path="/login" element={<Login />} />
<Route path="/teacher-register" element={<TeacherRegister />} />

{/* Student Management */}

<Route path="/add-student" element={<AddStudentModal />} />
<Route path="/students-list" element={<StudentsList />} />
<Route path="/face" element={<FaceCapture />} />

{/* QR Pages */}

<Route path="/qr" element={<StudentQR />} />
<Route path="/scan" element={<QRScanner />} />

{/* AI Attendance */}

<Route path="/attendance-marker" element={<AIPoseAttendance />} />
<Route path="/face-marker" element={<AttendanceMarker />} />

</Routes>

</Router>

);

}

export default App;