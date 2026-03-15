import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(){

const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(()=>{

const token = localStorage.getItem("token");

if(token){
setIsLoggedIn(true);
}

},[]);


const handleLogout = ()=>{

localStorage.removeItem("token");

setIsLoggedIn(false);

window.location.href="/";

};


return(

<nav className="navbar">

<div className="logo">
ANGANCARE
</div>

<ul className="nav-links">

<li><Link to="/">Home</Link></li>

<li><Link to="/attendance">Attendance</Link></li>

<li><Link to="/growth">Growth</Link></li>

<li><Link to="/report">Report</Link></li>

<li><Link to="/notification">Notification</Link></li>

<li><Link to="/profile">Profile</Link></li>

</ul>

<div className="nav-buttons">

{/* BEFORE LOGIN */}

{!isLoggedIn && (

<>

<Link to="/teacher-register">
<button className="start-btn">
Get Started
</button>
</Link>

<Link to="/login">
<button className="login-btn">
Login
</button>
</Link>

</>

)}

{/* AFTER LOGIN */}

{isLoggedIn && (

<button className="login-btn" onClick={handleLogout}>
Logout
</button>

)}

</div>

</nav>

)

}

export default Navbar;