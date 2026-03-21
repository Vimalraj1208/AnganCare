const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// upload API
router.post("/", upload.single("photo"), (req, res) => {
  res.json({
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
});

module.exports = router;