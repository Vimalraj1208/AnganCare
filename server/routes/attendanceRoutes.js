const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Attendance = require("../models/attendance");

router.post("/scan", async (req,res)=>{

try{

let { aadhaar } = req.body;

console.log("SCANNED QR VALUE:",aadhaar);

if(!aadhaar){
return res.status(400).json({
message:"QR data missing"
});
}

// extract student id from QR
let studentId = aadhaar.replace("STUDENT_ID:","").trim();

console.log("EXTRACTED STUDENT ID:",studentId);

// find student
const student = await Student.findById(studentId);

if(!student){
return res.status(404).json({
message:"Student not found"
});
}

// save attendance
const attendance = new Attendance({

studentId:student._id,
name:student.name,
date:new Date()

});

await attendance.save();

res.json({
message:`Attendance marked for ${student.name}`
});

}catch(err){

console.log(err);

res.status(500).json({
message:"Server error"
});

}

});

module.exports = router;