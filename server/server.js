const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ==============================
// 🔧 MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json({ limit: "10mb" }));


// ==============================
// 🔗 ROUTES IMPORT
// ==============================
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");


// ==============================
// 🚀 ROUTES USE
// ==============================
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);


// ==============================
// 🧪 TEST ROUTE
// ==============================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});


// ==============================
// 🗄️ MONGODB CONNECT
// ==============================
mongoose.connect("mongodb://127.0.0.1:27017/angancare", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  console.log("📦 DB Name:", mongoose.connection.name);
})
.catch((err) => {
  console.log("❌ DB Error:", err);
});


// ==============================
// 🌐 SERVER START
// ==============================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});