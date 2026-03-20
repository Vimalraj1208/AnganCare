const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  type: String,
  title: String,
  msg: String,

  // 🔥 EMAIL FORMAT
  from: String,
  to: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Notification", notificationSchema);