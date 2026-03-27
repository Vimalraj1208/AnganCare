const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance");
const Student = require("../models/student");

// ==============================
// ✅ MARK ATTENDANCE (QR + ID)
// ==============================
router.post("/mark", async (req, res) => {
  try {

    console.log("🔥 ATTENDANCE API HIT", req.body);

    let { studentId, qrData } = req.body;

    // 🔥 support QR format
    if (!studentId && qrData) {
      studentId = qrData.replace("STUDENT_ID:", "").trim();
    }

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

    // 📅 prevent duplicate (same day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
      name: student.name,
      photo: student.photo   // 🔥 include photo
    });

    await attendance.save();

    console.log("✅ Attendance Saved");

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