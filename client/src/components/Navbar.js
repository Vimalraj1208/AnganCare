import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

const navigate = useNavigate();

const [user,setUser] = useState(null);

useEffect(()=>{

const username = localStorage.getItem("username");

if(username){

setUser({
username: username
});

}

},[]);


const handleNavigate = (path)=>{

const token = localStorage.getItem("token");

if(!token){

navigate("/login");

}else{

navigate(path);

}

};


const logout = ()=>{

localStorage.removeItem("token");
localStorage.removeItem("username");
localStorage.removeItem("role");

setUser(null);

navigate("/login");

};


return(

<nav className="navbar">

<div className="logo" onClick={()=>navigate("/")}>
ANGANCARE
</div>

<ul className="nav-links">

<li onClick={()=>navigate("/")}>Home</li>

<li onClick={()=>handleNavigate("/attendance")}>Attendance</li>

<li onClick={()=>handleNavigate("/growth")}>Growth</li>

<li onClick={()=>handleNavigate("/report")}>Report</li>

<li onClick={()=>handleNavigate("/notification")}>Notification</li>

<li onClick={()=>handleNavigate("/profile")}>Settings</li>

</ul>

<div className="nav-buttons">

{user ? (

<div className="user-box">

<span className="username">
{user.username}
</span>

<button
className="logout-btn"
onClick={logout}
>

Logout

</button>

</div>

) : (

<>

<button
className="start-btn"
onClick={()=>navigate("/teacher-register")}
>

Get Started

</button>

<button
className="login-btn"
onClick={()=>navigate("/login")}
>

Login

</button>

</>

)}

</div>

</nav>

);

}

export default Navbar;