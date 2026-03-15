import React from "react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/loginAnimation.json";
import "../pages/Login.css";

function Login() {
  return (
    <div className="login-page">

      {/* Animation Background */}
      <div className="animation-bg">
        <Lottie animationData={loginAnimation} loop={true}/>
      </div>

      {/* Floating Login Form */}
      <div className="login-card">

        <h2>Login</h2>

        <input type="text" placeholder="Username"/>

        <input type="password" placeholder="Password"/>

        <div className="captcha-row">
          <span className="captcha-text">A3fK9</span>
          <button className="captcha-btn">↻</button>
          <button className="captcha-btn">🔊</button>
        </div>

        <input type="text" placeholder="Enter Captcha"/>

        <button className="login-btn">Login</button>

        <p className="register-link">
          New user? <span>Register here</span>
        </p>

      </div>

    </div>
  );
}

export default Login;