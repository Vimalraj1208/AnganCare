const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const QRCode = require("qrcode");

// ======================
// ➕ ADD STUDENT
// ======================
router.post("/", async (req, res) => {
  try {

    console.log("🔥 STUDENT API HIT", req.body);

    const {
      aadhaar,
      name,
      fatherName,
      fatherMobile,
      motherName,
      motherMobile,
      fatherEmail,
      motherEmail,
      gender,
      dob,
      age,
      height,
      weight,
      address
    } = req.body;

    // ✅ validation
    if (!aadhaar || !name) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar & Name required ❌"
      });
    }

    // ✅ duplicate check
    const existing = await Student.findOne({ aadhaar });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar already exists ❌"
      });
    }

    // ✅ STEP 1: create student
    const student = new Student({
      aadhaar,
      name,
      fatherName,
      fatherMobile,
      motherName,
      motherMobile,
      fatherEmail,
      motherEmail,
      gender,
      dob,
      age,
      height,
      weight,
      address
    });

    // ✅ STEP 2: save first
    await student.save();

    // ✅ STEP 3: generate QR
    const qrCode = await QRCode.toDataURL(`STUDENT_ID:${student._id}`);

    // ✅ STEP 4: update QR
    student.qrCode = qrCode;
    await student.save();

    // ✅ response
    res.status(201).json({
      success: true,
      message: "Student Registered ✅",
      qrCode,
      student
    });

  } catch (error) {

    console.log("❌ ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error ❌"
    });
  }
});


// ======================
// 📋 GET ALL STUDENTS
// ======================
router.get("/", async (req, res) => {
  try {

    const students = await Student.find();

    res.json({
      success: true,
      students
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