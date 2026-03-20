const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const QRCode = require("qrcode");


// ======================
// ➕ ADD STUDENT (POST)
// ======================
router.post("/", async (req, res) => {
  try {

    console.log("🔥 STUDENT API HIT");

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

    // ✅ REQUIRED CHECK
    if (!aadhaar || !name) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar and Name required ❌"
      });
    }

    // ✅ DUPLICATE CHECK
    const existing = await Student.findOne({ aadhaar });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar already exists ❌"
      });
    }

    // ✅ QR GENERATE FIRST
    const qrCode = await QRCode.toDataURL(`STUDENT_ID:${student._id}`);

    // ✅ CREATE STUDENT (ONE TIME SAVE ONLY 🔥)
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
      address,
      qrCode
    });

    await student.save();

    // ✅ RESPONSE
    res.status(201).json({
      success: true,
      message: "Student Registered Successfully ✅",
      qrCode,
      student
    });

  } catch (error) {

    console.log("❌ ERROR:", error);

    // duplicate error safe handle
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry ❌"
      });
    }

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

    res.status(200).json({
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