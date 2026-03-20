const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const Attendance = require("../models/attendance");

router.get("/", async (req, res) => {

  try {

    const total = await Student.countDocuments();

    const today = new Date().toISOString().split("T")[0];

    const present = await Attendance.countDocuments({ date: today });

    const absent = total - present;

    res.json({
      total,
      present,
      absent
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;