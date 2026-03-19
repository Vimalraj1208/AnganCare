const express = require("express");
const router = express.Router();
const multer = require("multer");

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  }
});

const upload = multer({ storage });

// API
router.post("/", upload.single("image"), (req, res) => {

  console.log("🔥 FILE UPLOADED");

  res.json({
    message: "File uploaded",
    file: req.file
  });

});

module.exports = router;