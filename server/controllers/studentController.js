const Student = require("../models/student");

exports.registerStudent = async(req,res)=>{

try{

const data=req.body;

const count = await Student.countDocuments();

const username = "ANGAN2K26"+String(count+1).padStart(3,"0");

const password = data.name+"@"+data.dob;

const student = new Student({

...data,
username,
password

})

await student.save();

res.json({

success:true,
username,
password

})

}catch(err){

res.status(500).json({

success:false,
message:"Server error"

})

}

}
exports.getStudents = async(req,res)=>{

try{    
const students = await Student.find();

res.json(students);

}catch(err){

res.status(500).json({ 
    message:"Server error"

})
}
};