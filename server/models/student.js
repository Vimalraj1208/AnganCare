const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({

aadhaar:String,
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

username:String,
password:String,

photo:String

})

module.exports=mongoose.model("Student",studentSchema);