import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register-animation.json";
import "./Register.css";

const TeacherRegister = () => {

const navigate = useNavigate();

/* =========================
STATE VARIABLES
========================= */

const [aadhaar,setAadhaar] = useState("");
const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const [captcha,setCaptcha] = useState("");
const [userCaptcha,setUserCaptcha] = useState("");

/* =========================
GENERATE CAPTCHA
========================= */

const generateCaptcha = () => {

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let newCaptcha = "";

for(let i=0;i<6;i++){

newCaptcha += chars.charAt(Math.floor(Math.random()*chars.length));

}

setCaptcha(newCaptcha);

};

/* =========================
VOICE CAPTCHA
========================= */

const speakCaptcha = () => {

const speech = new SpeechSynthesisUtterance(captcha.split("").join(" "));

speech.lang="en-US";

window.speechSynthesis.speak(speech);

};

/* =========================
PAGE LOAD CAPTCHA
========================= */

useEffect(()=>{
generateCaptcha();
},[]);


/* =========================
REGISTER FUNCTION
========================= */

const handleRegister = async () => {

if(userCaptcha !== captcha){

alert("Captcha Incorrect");

generateCaptcha();

return;

}

if(password !== confirmPassword){

alert("Passwords do not match");

return;

}

try{

const res = await fetch("http://localhost:5000/api/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

aadhaar,
name,
phone,
email,
username,
password

})

});

const data = await res.json();

if(data.success){

alert("Registration Successful");

navigate("/login");

}else{

alert(data.message || "Registration failed");

}

}catch(err){

console.error(err);

alert("Server error");

}

};


/* =========================
UI
========================= */

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

<input
placeholder="Aadhaar Number"
value={aadhaar}
onChange={(e)=>setAadhaar(e.target.value)}
/>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
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

<input
type="password"
placeholder="Retype Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>


{/* CAPTCHA */}

<div className="captcha-box">

<div className="captcha-text">

{captcha}

</div>

<button onClick={generateCaptcha}>
🔄
</button>

<button onClick={speakCaptcha}>
🔊
</button>

</div>


<input
placeholder="Enter Captcha"
value={userCaptcha}
onChange={(e)=>setUserCaptcha(e.target.value)}
/>


<button
className="register-btn"
onClick={handleRegister}
>

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