const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

aadhaarNumber:{
type:String,
required:true,
unique:true
},

name:String,
fatherName:String,
fatherMobile:String,
motherName:String,
motherMobile:String,
fatherEmail:String,
motherEmail:String,
gender:String,
dob:String,
age:Number,
height:Number,
weight:Number,
address:String,

qrCode:String

});

module.exports = mongoose.model("Student", studentSchema);