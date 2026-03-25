const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const Notification = require("./models/Notification");

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/angancare")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Socket.io
io.on("connection", (socket) => {
  console.log("⚡ User connected");
  socket.on("disconnect", () => console.log("❌ User disconnected"));
});

// ==============================
// 🔥 Notification Routes
// ==============================

// Send notification
app.post("/api/notify", async (req, res) => {
  try {
    const { type, message, from, to } = req.body;

    const newNotification = new Notification({
      type,
      title: type,
      msg: message,
      from,
      to
    });

    await newNotification.save();
    io.emit("new_notification", newNotification);

    res.json({ success: true, notification: newNotification });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving notification" });
  }
});

// Get all notifications
app.get("/api/notifications", async (req, res) => {
  try {
    const data = await Notification.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// Test
app.get("/", (req, res) => res.send("API WORKING 🚀"));

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));