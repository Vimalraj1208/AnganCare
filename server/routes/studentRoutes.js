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


// validation
if(!aadhaar){
return res.status(400).json({ message:"Aadhaar Number required" });
}

if(!name){
return res.status(400).json({ message:"Name required" });
}


// duplicate check
const existingStudent = await Student.findOne({ aadhaar });

if(existingStudent){
return res.status(400).json({ message:"Aadhaar already exists" });
}


// QR generate
const qrCode = await QRCode.toDataURL(String(aadhaar));


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

await student.save();


// response
res.json({
success:true,
message:"Student Registered Successfully",
qrCode,
student
});

} catch (error) {

console.log(error);

// duplicate error fallback
if(error.code === 11000){
return res.status(400).json({
message:"Aadhaar already exists"
});
}

res.status(500).json({
message:"Server Error",
error:error.message
});

}

});


// ============================
// GET ALL
// ============================

router.get("/", async (req, res) => {

try {

const students = await Student.find().sort({ createdAt:-1 });
res.json(students);

} catch (error) {

res.status(500).json({ message:"Server Error" });

}

});


// ============================
// GET ONE
// ============================

router.get("/:id", async (req, res) => {

try {

const student = await Student.findById(req.params.id);

if(!student){
return res.status(404).json({ message:"Student not found" });
}

res.json(student);

} catch (error) {

res.status(500).json({ message:"Server Error" });

}

});

module.exports = router;