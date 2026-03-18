const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

aadhaar:{
type:String,
required:true
},

name:{
type:String,
required:true
},

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

},{timestamps:true});

module.exports = mongoose.model("Student",studentSchema);