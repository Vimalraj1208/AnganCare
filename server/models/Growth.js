const mongoose = require("mongoose");

const growthSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  // 🔥 PHYSICAL
  height: Number,
  weight: Number,
  bmi: Number,

  // 🔥 COGNITIVE
  cognitiveScore: Number,

  // 🔥 MOTOR
  grossMotor: Number,
  fineMotor: Number,

  // 🔥 EMOTIONAL
  emotionalScore: Number,

  // 🔥 LANGUAGE
  languageScore: Number,

  // 🔥 FINAL SCORE
  overallScore: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Growth", growthSchema);