const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  gender: String
});

module.exports = mongoose.model("Profile", profileSchema);