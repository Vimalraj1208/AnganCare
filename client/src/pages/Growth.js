import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Growth.css";

function Growth() {

  const navigate = useNavigate();

  return (
    <div className="growth-page">

      <h2 className="growth-title">Growth Tracker</h2>

      <div className="growth-grid">

        {/* PHYSICAL */}
        <div
          className="growth-card"
          onClick={() => navigate("/growth/physical")}
        >
          <div className="icon">🧍</div>
          <h3>Physical</h3>
          <p>Height, Weight, BMI</p>
        </div>

        {/* COGNITIVE */}
        <div
          className="growth-card"
          onClick={() => navigate("/growth/cognitive")}
        >
          <div className="icon">🧠</div>
          <h3>Cognitive</h3>
          <p>Memory & Thinking</p>
        </div>

        {/* MOTOR */}
        <div
          className="growth-card"
          onClick={() => navigate("/growth/motor")}
        >
          <div className="icon">🏃</div>
          <h3>Motor Skills</h3>
          <p>Gross & Fine Motor</p>
        </div>

        {/* EMOTIONAL */}
        <div
          className="growth-card"
          onClick={() => navigate("/growth/emotional")}
        >
          <div className="icon">😊</div>
          <h3>Emotional</h3>
          <p>Mood & Behavior</p>
        </div>

        {/* LANGUAGE */}
        <div
          className="growth-card"
          onClick={() => navigate("/growth/language")}
        >
          <div className="icon">🗣️</div>
          <h3>Language</h3>
          <p>Speaking Skills</p>
        </div>

      </div>

    </div>
  );
}

export default Growth;