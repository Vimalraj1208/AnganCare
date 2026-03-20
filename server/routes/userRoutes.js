const express = require("express");
const router = express.Router();
const User = require("../models/user"); // MongoDB user schema
const bcrypt = require("bcrypt");

// 🔹 Update Profile
router.put("/profile/:id", async (req, res) => {
  try {
    const { name, username, email, phone, address, gender } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, username, email, phone, address, gender },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🔹 Change Password
router.put("/change-password/:id", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(400).json({ success: false, message: "Current password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;