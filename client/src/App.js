import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Growth from "./pages/Growth";
import Report from "./pages/Report";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import TeacherRegister from "./pages/TeacherRegister";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>
<Route path="/teacher-register" element={<TeacherRegister/>}/>

<Route path="/attendance"
element={
<ProtectedRoute>
<Attendance/>
</ProtectedRoute>
}
/>

<Route path="/growth"
element={
<ProtectedRoute>
<Growth/>
</ProtectedRoute>
}
/>

<Route path="/report"
element={
<ProtectedRoute>
<Report/>
</ProtectedRoute>
}
/>

<Route path="/notification"
element={
<ProtectedRoute>
<Notification/>
</ProtectedRoute>
}
/>

<Route path="/Profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;