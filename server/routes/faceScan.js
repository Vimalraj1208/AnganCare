const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const Student = require("../models/student");
const Attendance = require("../models/attendance");

router.post("/", async (req, res) => {

  try {

    console.log("🔥 FACE SCAN HIT");

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image missing" });
    }

    // ✅ ensure uploads folder exists
    const uploadDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // ✅ convert base64 → file
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    const fileName = Date.now() + ".png";
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, base64Data, "base64");

    console.log("📸 FILE SAVED:", filePath);

    // ✅ get student
    const student = await Student.findOne();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ save attendance
    const attendance = new Attendance({
      studentId: student._id,
      name: student.name,
      photo: fileName,   // 🔥 store filename only
      date: new Date()
    });

    await attendance.save();

    console.log("✅ SAVED TO DB");

    res.json({
      success: true,
      message: `Attendance marked for ${student.name}`
    });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }

});

module.exports = router;