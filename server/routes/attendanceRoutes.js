const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/student");

router.post("/mark", async (req, res) => {
  try {
    const { studentId } = req.body;

    console.log("📌 ID RECEIVED:", studentId);

    if (!studentId) {
      return res.json({
        success: false,
        message: "No studentId"
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.json({
        success: false,
        message: "Student not found"
      });
    }

    // 🔥 SAVE DIRECT (no duplicate logic for now)
    const attendance = new Attendance({
      studentId: student._id,
      name: student.name
    });

    await attendance.save();

    console.log("✅ SAVED");

    res.json({
      success: true,
      message: "Attendance marked"
    });

  } catch (err) {
    console.log("❌ ERROR:", err);

    res.json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;