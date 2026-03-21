const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// ==============================
// 🔥 GET PROFILE BY USER ID
// ==============================
router.get("/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.json({});
    }

    res.json(profile);

  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// ==============================
// 🔥 CREATE / UPDATE PROFILE
// ==============================
router.post("/", async (req, res) => {
  try {

    const { userId } = req.body;

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    res.json(profile);

  } catch (err) {
    res.status(500).json({ error: "Error saving profile" });
  }
});

module.exports = router;