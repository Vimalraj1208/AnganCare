const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Attendance = require("../models/attendance");

router.post("/scan", async (req, res) => {

  try {

    console.log("🔥 SCAN API HIT", req.body);

    const qrValue = req.body.aadhaar || req.body.qrData;

    if (!qrValue) {
      return res.status(400).json({ message: "QR missing" });
    }

    const studentId = qrValue.replace("STUDENT_ID:", "").trim();

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendance = new Attendance({
      studentId: student._id,
      name: student.name,
      date: new Date()
    });

    await attendance.save();

    console.log("✅ Attendance Saved");

    res.json({ message: "Attendance marked" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }

});

module.exports = router;