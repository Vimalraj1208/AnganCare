const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// DB CONNECT
connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ======================
// ROUTES IMPORT
// ======================

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const faceScanRoutes = require("./routes/faceScanRoutes"); // 🔥 ADD THIS

// ======================
// ROOT
// ======================

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// ======================
// API ROUTES
// ======================

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/faceScan", faceScanRoutes); // 🔥 ADD THIS

// ======================
// STATIC FILES (UPLOADS)
// ======================

app.use("/uploads", express.static("uploads")); // 🔥 IMPORTANT

// ======================
// PORT
// ======================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});