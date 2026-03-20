const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  studentId: String,
  studentName: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Notification", notificationSchema);