const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET.IO
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔥 MODELS
const Notification = require("./models/Notification");

// 🔥 ROUTES
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const faceScanRoutes = require("./routes/faceScan"); // ✅ FIXED NAME

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 MONGODB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/angancare")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 🔥 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("⚡ User connected");

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// ==============================
// 🔔 NOTIFICATION APIs
// ==============================

// ➕ SEND NOTIFICATION
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

    // 🔥 REALTIME SEND
    io.emit("new_notification", newNotification);

    res.json({ success: true, notification: newNotification });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving notification" });
  }
});

// 📥 GET NOTIFICATIONS
app.get("/api/notifications", async (req, res) => {
  try {
    const data = await Notification.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// ==============================
// 📦 OTHER ROUTES
// ==============================

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/faceScan", faceScanRoutes);

// 🔥 STATIC UPLOADS
app.use("/uploads", express.static("uploads"));

// ==============================
// ROOT
// ==============================

app.get("/", (req, res) => {
  res.send("🚀 API WORKING");
});

// ==============================
// START SERVER
// ==============================

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});