const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

// ==============================
// 📥 GET ALL NOTIFICATIONS
// ==============================
router.get("/", async (req, res) => {
  try {

    const notifications = await Notification
      .find()
      .sort({ createdAt: -1 }); // 🔥 correct field

    res.json({
      success: true,
      data: notifications
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error ❌"
    });

  }
});

module.exports = router;