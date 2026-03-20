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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    await fetch("http://localhost:5000/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

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
          <label>To</label>
          <input
            type="text"
            name="to"
            placeholder="parent@mail.com"
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

        <button className="send-btn" onClick={handleSubmit}>
          Send 📤
        </button>

      </div>

    </div>
  );
}

export default SendNotification;