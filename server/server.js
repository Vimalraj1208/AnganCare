const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 ROUTES IMPORT
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// 🔥 ROUTES USE
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

// 🔥 DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/angancare")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 SERVER START
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});