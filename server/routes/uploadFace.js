const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {

const { studentId, image } = req.body;

if (!studentId || !image) {
return res.json({ message: "Missing data" });
}

// remove base64 header
const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

const filePath = path.join(__dirname, "../faces", `${studentId}.jpg`);

fs.writeFileSync(filePath, base64Data, "base64");

res.json({ message: "Face saved successfully" });

});
console.log("Upload face is received");
module.exports = router;