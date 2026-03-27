const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  name: String,

  // 🔥 ADD THIS (for storing student photo)
  photo: String,

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Attendance", attendanceSchema);