import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Attendance() {

const navigate = useNavigate();

return (

<div className="attendance-page">

<h2 className="attendance-title">
Attendance Management
</h2>

<div className="attendance-grid">

<div
className="attendance-card"
onClick={()=>navigate("/add-student")}
>

<div className="card-icon">👶</div>

<h3>Add Student</h3>

<p>
Register new child
</p>

</div>


<div
className="attendance-card"
onClick={()=>navigate("/attendance-marker")}
>

<div className="card-icon">📷</div>

<h3>Attendance Marker</h3>

<p>
Face recognition attendance
</p>

</div>


<div
className="attendance-card"
onClick={()=>navigate("/attendance-dashboard")}
>

<div className="card-icon">📊</div>

<h3>Dashboard</h3>

<p>
Attendance statistics
</p>

</div>


<div
className="attendance-card"
onClick={()=>navigate("/students-list")}
>

<div className="card-icon">📋</div>

<h3>Student List</h3>

<p>
View registered students
</p>

</div>

</div>

</div>

);

}

export default Attendance;