import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/settings.css";

function Settings() {

  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: ""
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: ""
  });

  const userId = "YOUR_USER_ID"; // change this

  // 🔥 FETCH DATA
  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE PROFILE
  const updateProfile = async () => {
    try {
      await axios.put(`http://localhost:5000/api/profile/${userId}`, user);
      alert("Profile Updated ✅");
    } catch {
      alert("Update Failed ❌");
    }
  };

  // 🔥 PASSWORD CHANGE
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

  // 🔥 OFFLINE SAVE
  const saveOffline = () => {
    localStorage.setItem("offlineProfile", JSON.stringify(user));
    alert("Saved Offline 💾");
  };

  // 🔥 SYNC
  const syncData = async () => {
    const data = JSON.parse(localStorage.getItem("offlineProfile"));

    if (!data) return alert("No offline data");

    try {
      await axios.put(`http://localhost:5000/api/profile/${userId}`, data);
      localStorage.removeItem("offlineProfile");
      alert("Synced ✅");
    } catch {
      alert("Sync Failed ❌");
    }
  };

  return (
    <div className="container">

      {/* 🌍 LANGUAGE */}
      <div style={{ textAlign: "right" }}>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("ta")}>TA</button>
      </div>

      <h2>{t("profile")}</h2>

      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
      <input name="address" value={user.address} onChange={handleChange} placeholder="Address" />

      <select name="gender" value={user.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button onClick={updateProfile}>Update Profile</button>

      <button onClick={saveOffline}>Save Offline</button>
      <button onClick={syncData}>Sync</button>

      <h2>{t("change_password")}</h2>

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