const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance");
const Student = require("../models/student");


// ==============================
// ✅ MARK ATTENDANCE (POST)
// ==============================
router.post("/mark", async (req, res) => {
  try {

    console.log("🔥 ATTENDANCE API HIT");

    const { studentId } = req.body;

    // 🔴 check studentId
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID required ❌"
      });
    }

    // 🔍 find student
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found ❌"
      });
    }

    // 📅 today date (no duplicate)
    const today = new Date();
    today.setHours(0,0,0,0);

    const alreadyMarked = await Attendance.findOne({
      studentId,
      date: { $gte: today }
    });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Already marked today ⚠️"
      });
    }

    // 📝 CREATE ATTENDANCE
    const attendance = new Attendance({
      studentId,
      name: student.name
    });

    console.log("📝 Before Save:", attendance);

    await attendance.save();

    console.log("🔥 SAVED:", attendance);

    // ✅ RESPONSE
    res.status(201).json({
      success: true,
      message: "Attendance Marked ✅",
      attendance
    });

  } catch (error) {

    console.log("❌ ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error ❌"
    });
  }
});


// ==============================
// 📊 GET ALL ATTENDANCE
// ==============================
router.get("/", async (req, res) => {
  try {

    const data = await Attendance.find();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error ❌"
    });
  }
});


module.exports = router;