import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loginAnimation from "../assets/loginAnimation.json";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [captcha, setCaptcha] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  /* 🌐 LANGUAGE SWITCH */
  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  /* 🔐 CAPTCHA */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";

    for (let i = 0; i < 5; i++) {
      cap += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha(cap);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  /* 🔊 Voice captcha */
  const speakCaptcha = () => {
    const speech = new SpeechSynthesisUtterance(captcha);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  /* 👉 Go Register */
  const goRegister = () => {
    navigate("/teacher-register");
  };

  /* ================= LOGIN ================= */

  const handleLogin = async () => {

    if (username === "" || password === "") {
      alert(t("enter_credentials"));
      return;
    }

    if (captchaInput !== captcha) {
      alert(t("captcha_wrong"));
      generateCaptcha();
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role);

        alert(t("login_success"));

        navigate("/");
        window.location.reload();

      } else {
        alert(data.message);
      }

    } catch {
      alert(t("server_error"));
    }
  };

  return (
    <div className="login-page">

      {/* 🌐 LANGUAGE SWITCH */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <button onClick={() => changeLang("en")}>EN</button>
        <button onClick={() => changeLang("ta")}>TA</button>
      </div>

      {/* 🎥 ANIMATION */}
      <div className="animation-bg">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      {/* 🔐 LOGIN CARD */}
      <div className="login-card">

        <h2>{t("login")}</h2>

        <input
          type="text"
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CAPTCHA */}
        <div className="captcha-row">

          <span className="captcha-text">{captcha}</span>

          <button className="captcha-btn" onClick={generateCaptcha}>↻</button>
          <button className="captcha-btn" onClick={speakCaptcha}>🔊</button>

        </div>

        <input
          type="text"
          placeholder={t("enter_captcha")}
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          {t("login")}
        </button>

        <p className="register-link">
          {t("new_user")}{" "}
          <span onClick={goRegister}>{t("register_here")}</span>
        </p>

      </div>

    </div>
  );
}

export default Login;