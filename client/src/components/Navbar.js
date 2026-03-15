import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {

const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleProtected = (path) => {

if(!token){
alert("Please login first");
navigate("/login");
}
else{
navigate(path);
}

};

return(

<nav className="navbar">

{/* LOGO */}

<div className="logo">
ANGANCARE
</div>


{/* NAV LINKS */}

<ul className="nav-links">

<li onClick={()=>navigate("/")}>Home</li>

<li onClick={()=>handleProtected("/attendance")}>
Attendance
</li>

<li onClick={()=>handleProtected("/growth")}>
Growth
</li>

<li onClick={()=>handleProtected("/report")}>
Report
</li>

<li onClick={()=>handleProtected("/notification")}>
Notification
</li>

<li onClick={()=>handleProtected("/profile")}>
Profile
</li>

</ul>


{/* BUTTONS */}

<div className="nav-buttons">

<button
className="get-started"
onClick={()=>navigate("/teacher-register")}
>
Get Started
</button>

{token ? (

<div className="logged">
<FaLock className="lock-icon"/>
Logged In
</div>

) : (

<button
className="login-btn"
onClick={()=>navigate("/login")}
>
Login
</button>

)}

</div>

</nav>

);

}

export default Navbar;