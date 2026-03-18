const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const QRCode = require("qrcode");

/* =========================
REGISTER STUDENT + QR GENERATE
========================= */

router.post("/", async (req, res) => {

try{

const {
aadhaarNumber,
name,
fatherName,
fatherMobile,
motherName,
motherMobile,
fatherEmail,
motherEmail,
gender,
dob,
age,
height,
weight,
address
} = req.body;

/* ======================
CHECK DUPLICATE
====================== */

const existingStudent = await Student.findOne({ aadhaarNumber });

if(existingStudent){

return res.json({
success:false,
message:"Student already exists"
});

}

/* ======================
CREATE STUDENT
====================== */

const student = new Student({

aadhaarNumber,
name,
fatherName,
fatherMobile,
motherName,
motherMobile,
fatherEmail,
motherEmail,
gender,
dob,
age,
height,
weight,
address

});

await student.save();

/* ======================
GENERATE QR CODE
====================== */

const qrData = `STUDENT_ID:${student._id}`;

const qrCodeImage = await QRCode.toDataURL(qrData);

/* ======================
SAVE QR IN DATABASE
====================== */

student.qrCode = qrCodeImage;

await student.save();

/* ======================
RESPONSE
====================== */

res.json({

success:true,
message:"Student Registered Successfully",
qrCode:qrCodeImage

});

}catch(error){

console.log("REGISTER ERROR:",error);

res.json({

success:false,
message:"Failed to register student"

});

}

});

module.exports = router;