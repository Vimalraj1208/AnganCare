const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({

  aadhaar: String,
  name: String,
  phone: String,
  email: String,
  username: String,
  password: String

});

module.exports = mongoose.model("Teacher", teacherSchema);