import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import loginAnimation from "../assets/loginAnimation.json";
import "../styles/Login.css";

function Login() {

const navigate = useNavigate();

const [captcha, setCaptcha] = useState("");

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

/* First time captcha */

useEffect(() => {

generateCaptcha();

}, []);

/* Voice Captcha */

const speakCaptcha = () => {

const speech = new SpeechSynthesisUtterance(captcha);

speech.rate = 0.8;

window.speechSynthesis.speak(speech);

};

/* Go to register */

const goRegister = () => {

navigate("/teacher-register");

};

return (

<div className="login-page">

<div className="animation-bg">
<Lottie animationData={loginAnimation} loop={true} />
</div>

<div className="login-card">

<h2>Login</h2>

<input type="text" placeholder="Username" />

<input type="password" placeholder="Password" />

<div className="captcha-row">

<span className="captcha-text">{captcha}</span>

<button className="captcha-btn" onClick={generateCaptcha}>
↻
</button>

<button className="captcha-btn" onClick={speakCaptcha}>
🔊
</button>

</div>

<input type="text" placeholder="Enter Captcha" />

<button className="login-btn">Login</button>

<p className="register-link">
New user?{" "}
<span onClick={goRegister}>Register here</span>
</p>

</div>

</div>

);

}

export default Login;