const Student = require("../models/student");
const QRCode = require("qrcode");

exports.registerStudent = async (req,res)=>{

try{

const data = req.body;

const studentId = data.studentId;

const qrCode = await QRCode.toDataURL(studentId);

const student = new Student({
aadhaarNumber:data.aadhaarNumber,
fullName:data.fullName,
fatherName:data.fatherName,
motherName:data.motherName,
fatherNumber:data.fatherNumber,
motherNumber:data.motherNumber,
gender:data.gender,
dob:data.dob,
height:data.height,
weight:data.weight,
studentId:studentId,
qrCode:qrCode
});

await student.save();

res.status(201).json({
message:"Student Registered Successfully",
student
});

}catch(error){

console.log(error);

res.status(500).json({
message:"Registration failed"
});

}

};