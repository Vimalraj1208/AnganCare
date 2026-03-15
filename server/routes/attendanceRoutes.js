const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

// mark attendance
router.post("/mark", attendanceController.markAttendance);

// get attendance list
router.get("/all", attendanceController.getAllAttendance);

module.exports = router;