const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// 🔥 MODELS
const Notification = require("./models/Notification");

// 🔥 ROUTES
const profileRoutes = require("./routes/profileRoutes");
const uploadRoute = require("./routes/upload"); // ✅ NEW

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 STATIC FOLDER (PHOTO ACCESS)
app.use("/uploads", express.static("uploads")); // ✅ NEW

// 🔥 DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/angancare")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 SOCKET CONNECT
io.on("connection", (socket) => {
  console.log("⚡ User connected");

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// ==============================
// 🔥 PROFILE ROUTE
// ==============================
app.use("/api/profile", profileRoutes);

// ==============================
// 🔥 PHOTO UPLOAD ROUTE
// ==============================
app.use("/api/upload", uploadRoute); // ✅ NEW

// ==============================
// 🔥 SAVE NOTIFICATION
// ==============================
app.post("/api/notify", async (req, res) => {
  try {
    const { type, title, msg, from, to } = req.body;

    const newNotification = new Notification({
      type,
      title,
      msg,
      from,
      to
    });

    await newNotification.save();

    io.emit("new_notification", newNotification);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Error saving notification" });
  }
});

// ==============================
// 🔥 GET NOTIFICATIONS (24 HOURS)
// ==============================
app.get("/api/notifications", async (req, res) => {
  try {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const data = await Notification.find({
      createdAt: { $gte: last24Hours }
    }).sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// ==============================
// 🔥 ROOT TEST
// ==============================
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ==============================
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});