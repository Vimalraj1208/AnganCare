const express = require("express");
const router = express.Router();
const Growth = require("../models/Growth");

// 🔥 ADD GROWTH
router.post("/", async (req, res) => {

  try {

    const data = req.body;

    // 🔥 BMI CALC
    const bmi = data.weight / ((data.height / 100) ** 2);

    // 🔥 OVERALL SCORE
    const overall =
      (data.cognitiveScore +
       data.grossMotor +
       data.fineMotor +
       data.emotionalScore +
       data.languageScore) / 5;

    const newGrowth = new Growth({
      ...data,
      bmi,
      overallScore: overall
    });

    await newGrowth.save();

    res.json(newGrowth);

  } catch (err) {
    res.status(500).json({ error: "Error saving growth" });
  }

});

// 🔥 GET BY STUDENT
router.get("/:studentId", async (req, res) => {

  const data = await Growth.find({
    studentId: req.params.studentId
  }).sort({ createdAt: -1 });

  res.json(data);

});

module.exports = router;