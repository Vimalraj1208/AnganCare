import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import aiAnimation from "../assets/Robot says hello.json";
import "../styles/Home.css";
import Footer from "../components/Footer";

function Home(){

  const navigate = useNavigate();
  const { t } = useTranslation();

  const goLogin = () => {
    navigate("/login");
  };

  return(

    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">

        <div className="hero-text">

          <h1>{t("hero_title")}</h1>
          <p>{t("hero_sub")}</p>

          <button
            className="explore-btn"
            onClick={goLogin}
          >
            {t("explore")}
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

        <h2>{t("about_title")}</h2>

        <p>{t("about_desc")}</p>

      </div>

      {/* FEATURES */}
      <div className="features">

        <div className="feature-card" onClick={goLogin}>
          <h3>{t("feature1_title")}</h3>
          <p>{t("feature1_desc")}</p>
        </div>

        <div className="feature-card" onClick={goLogin}>
          <h3>{t("feature2_title")}</h3>
          <p>{t("feature2_desc")}</p>
        </div>

        <div className="feature-card" onClick={goLogin}>
          <h3>{t("feature3_title")}</h3>
          <p>{t("feature3_desc")}</p>
        </div>

      </div>

      <Footer/>

    </div>
  );
}

export default Home;