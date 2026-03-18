const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const QRCode = require("qrcode");


// ============================
// REGISTER STUDENT
// ============================

router.post("/", async (req, res) => {

try {

const {
aadhaar,
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


// check duplicate aadhaar
const existingStudent = await Student.findOne({ aadhaar });

if(existingStudent){

return res.status(400).json({
message:"Student already registered"
});

}


// generate QR code
const qrCode = await QRCode.toDataURL(aadhaar);


// create student
const student = new Student({

aadhaar,
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
address,
qrCode

});


// save student
await student.save();


// response
res.status(201).json({

message:"Student Registered Successfully",
student,
qrCode

});

} catch (error) {

console.error(error);

res.status(500).json({
message:"Server Error"
});

}

});


// ============================
// GET ALL STUDENTS
// ============================

router.get("/", async (req, res) => {

try {

const students = await Student.find().sort({ createdAt: -1 });

res.status(200).json(students);

} catch (error) {

console.error(error);

res.status(500).json({
message:"Server Error"
});

}

});


// ============================
// GET SINGLE STUDENT
// ============================

router.get("/:id", async (req, res) => {

try {

const student = await Student.findById(req.params.id);

if(!student){

return res.status(404).json({
message:"Student not found"
});

}

res.json(student);

} catch (error) {

console.error(error);

res.status(500).json({
message:"Server Error"
});

}

});


module.exports = router;