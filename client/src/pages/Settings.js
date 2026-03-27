import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Settings.css";
import { useTranslation } from "react-i18next";

function Settings() {

  const { t, i18n } = useTranslation();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    photo: ""
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: ""
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");

  const userId = localStorage.getItem("userId");

  // 🌐 Language load
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // 🔥 Fetch profile
  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => {
        setProfile(res.data || {});
        setPreview(res.data?.photo || "");
      })
      .catch(err => console.log(err));

  }, [userId]);

  // 🔥 Input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 📸 Photo select
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 📤 Upload photo
  const uploadPhoto = async () => {
    if (!photoFile) return alert("Select a photo");

    const formData = new FormData();
    formData.append("photo", photoFile);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      const imageUrl = res.data.imageUrl;

      setProfile(prev => ({ ...prev, photo: imageUrl }));
      alert("Photo Uploaded ✅");

    } catch {
      alert("Upload Failed ❌");
    }
  };

  // 🔥 Update profile
  const updateProfile = async () => {
    if (!userId) return alert("Login first");

    try {
      await axios.post("http://localhost:5000/api/profile", {
        ...profile,
        userId
      });

      alert("Updated ✅");

    } catch {
      alert("Update Failed ❌");
    }
  };

  // 🔐 Change password
  const changePassword = async () => {
    if (password.newPass !== password.confirm) {
      return alert("Password mismatch");
    }

    try {
      await axios.post(`http://localhost:5000/api/change-password/${userId}`, password);
      alert("Password Changed 🔐");
    } catch {
      alert("Error ❌");
    }
  };

  // 💾 Offline save
  const saveOffline = () => {
    localStorage.setItem("offlineProfile", JSON.stringify({
      ...profile,
      userId
    }));
    alert("Saved Offline 💾");
  };

  // 🔄 Sync
  const syncData = async () => {
    const data = JSON.parse(localStorage.getItem("offlineProfile"));

    if (!data) return alert("No offline data");

    try {
      await axios.post("http://localhost:5000/api/profile", data);
      localStorage.removeItem("offlineProfile");
      alert("Synced 🔄");
    } catch {
      alert("Sync Failed ❌");
    }
  };

  return (
    <div className="container">

      {/* 🌍 Language */}
      <div style={{ textAlign: "right" }}>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("ta")}>TA</button>
      </div>

      <h2>{t("settings")}</h2>

      {/* 📸 PHOTO */}
      <h3>{t("profile_photo")}</h3>

      <input type="file" onChange={handlePhoto} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: "100px", marginTop: "10px", borderRadius: "10px" }}
        />
      )}

      <button onClick={uploadPhoto}>
        {t("upload_photo")}
      </button>

      {/* 👤 PROFILE */}
      <h3>{t("profile")}</h3>

      <div className="form-box">

        <input name="name" value={profile.name || ""} onChange={handleChange} placeholder={t("name")} />
        <input name="email" value={profile.email || ""} onChange={handleChange} placeholder={t("email")} />
        <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder={t("phone")} />
        <input name="address" value={profile.address || ""} onChange={handleChange} placeholder={t("address")} />

        <select name="gender" value={profile.gender || ""} onChange={handleChange}>
          <option value="">{t("gender")}</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button onClick={updateProfile}>{t("update")}</button>
        <button onClick={saveOffline}>{t("save_offline")}</button>
        <button onClick={syncData}>{t("sync")}</button>

      </div>

      {/* 🔐 PASSWORD */}
      <h3>{t("change_password")}</h3>

      <input type="password" placeholder="Current Password"
        onChange={(e) => setPassword({ ...password, current: e.target.value })} />

      <input type="password" placeholder="New Password"
        onChange={(e) => setPassword({ ...password, newPass: e.target.value })} />

      <input type="password" placeholder="Confirm Password"
        onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />

      <button onClick={changePassword}>Change Password</button>

    </div>
  );
}

export default Settings;