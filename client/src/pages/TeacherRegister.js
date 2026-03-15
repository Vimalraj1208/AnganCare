import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register-animation.json";
import "./Register.css";

const TeacherRegister = () => {

const navigate = useNavigate();

const [captcha,setCaptcha] = useState("");
const [userCaptcha,setUserCaptcha] = useState("");


// generate captcha
const generateCaptcha = () => {

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let newCaptcha = "";

for(let i=0;i<6;i++){

newCaptcha += chars.charAt(Math.floor(Math.random()*chars.length));

}

setCaptcha(newCaptcha);

};


// voice captcha
const speakCaptcha = () => {

const speech = new SpeechSynthesisUtterance(captcha.split("").join(" "));

speech.lang="en-US";

window.speechSynthesis.speak(speech);

};


// generate captcha on page load
useEffect(()=>{
generateCaptcha();
},[]);


// register function
const handleRegister = () => {

if(userCaptcha !== captcha){

alert("Captcha Incorrect");

generateCaptcha();

return;

}

alert("Registration Successful");

navigate("/login");

};


return(

<div className="register-page">

<div className="register-container">

{/* LEFT SIDE ANIMATION */}

<div className="register-left">

<Lottie
animationData={registerAnimation}
loop={true}
className="animation"
/>

</div>


{/* RIGHT SIDE FORM */}

<div className="register-right">

<div className="register-card">

<h2>Teacher Register</h2>

<input placeholder="Aadhaar Number"/>

<input placeholder="Full Name"/>

<input placeholder="Phone Number"/>

<input placeholder="Email"/>

<input placeholder="Username"/>

<input type="password" placeholder="Password"/>

<input type="password" placeholder="Retype Password"/>


{/* CAPTCHA */}

<div className="captcha-box">

<div className="captcha-text">

{captcha}

</div>

<button onClick={generateCaptcha}>🔄</button>

<button onClick={speakCaptcha}>🔊</button>

</div>


<input
placeholder="Enter Captcha"
value={userCaptcha}
onChange={(e)=>setUserCaptcha(e.target.value)}
/>


<button className="register-btn" onClick={handleRegister}>

Register

</button>


<p className="login-link">

Already have an account?  

<span onClick={()=>navigate("/login")}>

Login

</span>

</p>

</div>

</div>

</div>

</div>

);

};

export default TeacherRegister;