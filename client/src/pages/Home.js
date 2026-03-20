import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import aiAnimation from "../assets/Robot says hello.json";
import "../styles/Home.css";
import Footer from "../components/Footer";

function Home(){

const navigate = useNavigate();

const goLogin = ()=>{
navigate("/login");
};

return(

<div className="home">


{/* HERO SECTION */}

<div className="hero">

<div className="hero-text">

<h1>Smart AI-Based Anganwadi Monitoring System</h1>

<p>AI Powered Child Monitoring System</p>

<button
className="explore-btn"
onClick={goLogin}
>

Explore Now

</button>

</div>

<div className="hero-animation">

<Lottie
animationData={aiAnimation}
loop={true}
style={{ width: 300 }}
/>

</div>

</div>


{/* ABOUT */}

<div className="about">

<h2>About AnganCare</h2>

<p>

AnganCare is an AI-powered smart monitoring system designed to modernize Anganwadi centers.  
It helps teachers track attendance using face recognition, monitor growth patterns using predictive analytics, and evaluate skill development for early childhood learning.

</p>

</div>

{/* FEATURES */}

<div className="features">

<div className="feature-card" onClick={goLogin}>
<h3>📷 Smart Attendance Tracking</h3>
<p>Face recognition attendance</p>
</div>

<div className="feature-card" onClick={goLogin}>
<h3>📈 Predictive Growth Analysis</h3>
<p>Growth monitoring system</p>
</div>

<div className="feature-card" onClick={goLogin}>
<h3>🧠 Skill Intelligence Engine</h3>
<p>Track learning skills</p>
</div>

</div>

<Footer/>

</div>

);

}

export default Home;