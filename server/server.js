const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
});

app.set("io",io);


// ======================
// GLOBAL MIDDLEWARE
// ======================

app.use(cors());

// JSON BODY PARSER
app.use(express.json({ limit: "10mb" }));

// FORM DATA PARSER
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// ======================
// ROUTES IMPORT
// ======================

const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes = require("./routes/studentRoutes");
const faceScanRoutes = require("./routes/faceScan");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadFace");   // moved here
const notificationRoutes = require("./routes/notificationRoutes"); // new route


// ======================
// ROOT ROUTE
// ======================

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Anganwadi Backend Running"
  });
});


// ======================
// API ROUTES
// ======================

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faceScan", faceScanRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
// FILE STATIC ROUTE
app.use("/students", express.static("uploads/students"));

// FACE UPLOAD ROUTE
app.use("/uploadFace", uploadRoutes);


// ======================
// SOCKET CONNECTION
// ======================

io.on("connection",(socket)=>{
  console.log("👨‍🏫 Teacher Connected");
});


// ======================
// SERVER START
// ======================

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
  console.log(`🔥 Server running on port ${PORT}`);
});