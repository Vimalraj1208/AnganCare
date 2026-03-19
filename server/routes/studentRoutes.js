const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const QRCode = require("qrcode");


// ======================
// ➕ ADD STUDENT (POST)
// ======================
router.post("/", async (req, res) => {

  console.log("🔥 STUDENT API HIT");
  console.log(req.body);

  try {

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

    // duplicate check
    const existing = await Student.findOne({ aadhaar });

    if (existing) {
      return res.status(400).json({
        message: "Aadhaar already exists"
      });
    }

    // create student
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

    await student.save();

    // QR generate
    const qrCode = await QRCode.toDataURL(`STUDENT_ID:${student._id}`);

    student.qrCode = qrCode;
    await student.save();

    res.json({
      success: true,
      qrCode,
      student
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }

});


// ======================
// 📋 GET ALL STUDENTS
// ======================
router.get("/", async (req, res) => {
  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});


module.exports = router;