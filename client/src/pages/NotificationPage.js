import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../styles/NotificationPage.css";

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [type, setType] = useState("Information");
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState("");

  const recipientOptions = [
    { value: "parent", label: "Parent" },
    { value: "admin", label: "Admin" },
    { value: "teacher", label: "Teacher" },
  ];

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    const res = await fetch("http://localhost:5000/api/notifications");
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Send notification
  const handleSend = async () => {
    if (!recipients.length || !message) return alert("Please fill all fields");

    const to = recipients.map((r) => r.value).join(",");

    await fetch("http://localhost:5000/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        msg: message,
        from: "teacher1",
        to,
      }),
    });

    setMessage("");
    setRecipients([]);
    setShowCompose(false);
    fetchNotifications();
  };

  return (
    <div className="notification-page">
      <h2>Inbox</h2>

      <button className="compose-btn" onClick={() => setShowCompose(true)}>
        Compose
      </button>

      {showCompose && (
        <div className="compose-modal">
          <div className="compose-container">
            <div className="compose-header">
              <h3>New Message</h3>
              <button onClick={() => setShowCompose(false)}>X</button>
            </div>

            <div className="compose-body">
              <div className="left-panel">
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option>Information</option>
                  <option>Supplementary / Food</option>
                  <option>Report</option>
                </select>

                <label>Recipients:</label>
                <Select
                  options={recipientOptions}
                  isMulti
                  value={recipients}
                  onChange={setRecipients}
                  placeholder="Select recipients"
                />

                <label>Message:</label>
                <textarea
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button className="send-btn" onClick={handleSend}>
                  Send
                </button>
              </div>

              <div className="right-panel">
                <h4>Preview</h4>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>To:</strong> {recipients.map(r => r.label).join(", ")}</p>
                <p><strong>Message:</strong> {message || "No message"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="inbox">
        {notifications.length === 0 && <p>No messages</p>}

        {notifications.map((n) => (
          <div key={n._id} className="inbox-item">
            <strong>{n.type}</strong>
            <p>{n.msg || "No message"}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPage;
