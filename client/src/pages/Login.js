import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../assets/loginAnimation.json";
import "../styles/Login.css";

function Login() {

const navigate = useNavigate();

const [captcha, setCaptcha] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [captchaInput, setCaptchaInput] = useState("");

/* Generate Captcha */

const generateCaptcha = () => {

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let cap = "";

for (let i = 0; i < 5; i++) {

cap += chars.charAt(Math.floor(Math.random() * chars.length));

}

setCaptcha(cap);

};

/* First load captcha */

useEffect(() => {

generateCaptcha();

}, []);


/* Voice captcha */

const speakCaptcha = () => {

const speech = new SpeechSynthesisUtterance(captcha);

speech.rate = 0.8;

window.speechSynthesis.speak(speech);

};


/* Go register */

const goRegister = () => {

navigate("/teacher-register");

};


/* ================= LOGIN ================= */

const handleLogin = async () => {

if(username === "" || password === ""){

alert("Enter username and password");
return;

}

if(captchaInput !== captcha){

alert("Captcha incorrect");
generateCaptcha();
return;

}

try{

const res = await fetch("http://localhost:5000/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})

});

const data = await res.json();

if(data.success){

/* save session */

localStorage.setItem("token","loggedin");
localStorage.setItem("username",data.username);
localStorage.setItem("role",data.role);

alert("Login Successful");

/* redirect */

navigate("/");
window.location.reload(); // <-- only redirect

}else{

alert(data.message);

}

}catch(err){

alert("Server error");

}

};


/* UI */

return (

<div className="login-page">

<div className="animation-bg">
<Lottie animationData={loginAnimation} loop={true} />
</div>

<div className="login-card">

<h2>Login</h2>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<div className="captcha-row">

<span className="captcha-text">{captcha}</span>

<button className="captcha-btn" onClick={generateCaptcha}>
↻
</button>

<button className="captcha-btn" onClick={speakCaptcha}>
🔊
</button>

</div>

<input
type="text"
placeholder="Enter Captcha"
value={captchaInput}
onChange={(e)=>setCaptchaInput(e.target.value)}
/>

<button className="login-btn" onClick={handleLogin}>
Login
</button>

<p className="register-link">
New user?{" "}
<span onClick={goRegister}>Register here</span>
</p>

</div>

</div>

);

}

export default Login;