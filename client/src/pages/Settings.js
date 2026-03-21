import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Settings.css";
import { useTranslation } from "react-i18next";

const Settings = () => {

  const { t, i18n } = useTranslation();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    photo: ""
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");

  const userId = localStorage.getItem("userId");

  // 🔥 SET LANGUAGE ON LOAD
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // 🔥 FETCH PROFILE
  useEffect(() => {

    if (!userId) return;

    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => {
        setProfile(res.data || {});
        setPreview(res.data?.photo || "");
      })
      .catch(err => console.log(err));

  }, [userId]);

  // 🔥 INPUT
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 🔥 PHOTO SELECT
  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔥 UPLOAD PHOTO
  const uploadPhoto = async () => {

    if (!photoFile) {
      alert("Select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photoFile);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      const imageUrl = res.data.imageUrl;

      setProfile(prev => ({ ...prev, photo: imageUrl }));

      alert("Photo Uploaded ✅");

    } catch (err) {
      console.log(err);
      alert("Upload Failed ❌");
    }
  };

  // 🔥 UPDATE PROFILE
  const updateProfile = async () => {

    if (!userId) {
      alert("Login first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/profile", {
        ...profile,
        userId
      });

      alert("Updated ✅");

    } catch (err) {
      console.log(err);
      alert("Update Failed ❌");
    }
  };

  // 🔥 OFFLINE SAVE
  const saveOffline = () => {
    localStorage.setItem("offlineProfile", JSON.stringify({
      ...profile,
      userId
    }));

    alert("Saved Offline 💾");
  };

  // 🔥 SYNC
  const syncData = async () => {

    const data = JSON.parse(localStorage.getItem("offlineProfile"));

    if (!data) {
      alert("No offline data");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/profile", data);

      localStorage.removeItem("offlineProfile");

      alert("Synced 🔄");

    } catch (err) {
      console.log(err);
      alert("Sync Failed ❌");
    }
  };

  // 🔥 UI
  return (
    <div className="container">

      <h2>{t("settings")}</h2>

      {/* 📸 PHOTO */}
      <h3>{t("profile_photo")}</h3>

      <input type="file" onChange={handlePhoto} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: "100px",
            marginTop: "10px",
            borderRadius: "10px"
          }}
        />
      )}

      <button onClick={uploadPhoto}>
        {t("upload_photo")}
      </button>

      {/* 👤 PROFILE */}
      <h3>{t("profile")}</h3>

      <div className="form-box">

        <input
          name="name"
          value={profile.name || ""}
          onChange={handleChange}
          placeholder={t("name")}
        />

        <input
          name="email"
          value={profile.email || ""}
          onChange={handleChange}
          placeholder={t("email")}
        />

        <input
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          placeholder={t("phone")}
        />

        <input
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          placeholder={t("address")}
        />

        <select
          name="gender"
          value={profile.gender || ""}
          onChange={handleChange}
        >
          <option value="">{t("gender")}</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button onClick={updateProfile}>
          {t("update")}
        </button>

        <button onClick={saveOffline}>
          {t("save_offline")}
        </button>

        <button onClick={syncData}>
          {t("sync")}
        </button>

      </div>

    </div>
  );
};

export default Settings;