import React, { useState } from "react";
import "../styles/SendNotification.css";

function SendNotification() {

  const [form, setForm] = useState({
    from: "angan@care.com",
    to: "",
    title: "",
    msg: "",
    type: "info"
  });

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 PUSH NOTIFICATION (FREE)
  const sendPushNotification = () => {
    if (Notification.permission === "granted") {
      new Notification(form.title || "AnganCare", {
        body: form.msg || "New notification",
        icon: "🔔"
      });
    } else {
      Notification.requestPermission();
    }
  };

  // 🔥 WHATSAPP (FREE METHOD)
  const sendWhatsApp = () => {
    if (!form.to) return;

    const phone = form.to.replace(/\D/g, ""); // numbers only
    const message = `${form.title}\n${form.msg}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {

    // 👉 Save DB
    await fetch("http://localhost:5000/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    // 👉 PUSH
    sendPushNotification();

    alert("✅ Notification Sent");

    setForm({
      from: "angan@care.com",
      to: "",
      title: "",
      msg: "",
      type: "info"
    });
  };

  return (
    <div className="mail-container">

      <div className="mail-box">

        <h2>📧 Compose Notification</h2>

        <div className="mail-field">
          <label>From</label>
          <input
            type="text"
            name="from"
            value={form.from}
            onChange={handleChange}
          />
        </div>

        <div className="mail-field">
          <label>To (Phone number)</label>
          <input
            type="text"
            name="to"
            placeholder="91XXXXXXXXXX"
            value={form.to}
            onChange={handleChange}
          />
        </div>

        <div className="mail-field">
          <label>Category</label>
          <select name="type" onChange={handleChange}>
            <option value="info">Information</option>
            <option value="food">Food</option>
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <div className="mail-field">
          <label>Subject</label>
          <input
            type="text"
            name="title"
            placeholder="Enter subject"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mail-field">
          <label>Message</label>
          <textarea
            name="msg"
            placeholder="Write your message..."
            rows="6"
            value={form.msg}
            onChange={handleChange}
          />
        </div>

        {/* 🔥 BUTTONS */}
        <button className="send-btn" onClick={handleSubmit}>
          Send Notification 🔔
        </button>

        <button
          className="send-btn"
          style={{ marginTop: "10px", background: "#25D366" }}
          onClick={sendWhatsApp}
        >
          Send WhatsApp 💬
        </button>

      </div>

    </div>
  );
}

export default SendNotification;