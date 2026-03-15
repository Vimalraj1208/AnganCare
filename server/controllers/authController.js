const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Aadhaar = require("../models/aadhaar");

const Student = require("../models/student");

// ==========================
// LOGIN
// ==========================
exports.login = async (req, res) => {

try{

const { username, password } = req.body;

/* =========================
ADMIN LOGIN
========================= */

if(username === "Admin@Angancare" && password === "admin123"){

return res.json({
success:true,
role:"admin",
username:"Admin"
});

}

/* =========================
TEACHER LOGIN
========================= */

const teacher = await Teacher.findOne({ username });

if(teacher){

if(teacher.password !== password){

return res.status(400).json({
success:false,
message:"Invalid password"
});

}

return res.json({
success:true,
role:"teacher",
username:teacher.username
});

}

/* =========================
PARENT LOGIN
========================= */

const student = await Student.findOne({ studentId: username });

if(student){

if(student.password !== password){

return res.status(400).json({
success:false,
message:"Invalid password"
});

}

return res.json({
success:true,
role:"parent",
username:student.studentId
});

}

return res.status(400).json({
success:false,
message:"User not found"
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Server error"
});

}

};

// ==========================
// REGISTER
// ==========================
exports.register = async (req, res) => {

  try {

    const { aadhaar, name, phone, email, username, password } = req.body;

    // Check empty fields
    if (!aadhaar || !name || !phone || !email || !username || !password) {
      return res.status(400).json({
        success:false,
        message: "All fields required"
      });
    }

    // Check existing username
    const existingUser = await Teacher.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success:false,
        message: "Username already exists"
      });
    }

    // Create teacher
    const newTeacher = new Teacher({
      aadhaar,
      name,
      phone,
      email,
      username,
      password
    });

    await newTeacher.save();

    res.status(201).json({
      success:true,
      message: "Teacher Registered Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message: "Server Error"
    });

  }

};



// ==========================
// LOGIN
// ==========================


exports.login = async (req, res) => {

try{

const { username, password } = req.body;

/* =========================
ADMIN LOGIN
========================= */

if(username === "Admin@Angancare" && password === "admin123"){

return res.json({
success:true,
role:"admin",
username:"Admin"
});

}

/* =========================
TEACHER LOGIN
========================= */

const teacher = await Teacher.findOne({ username });

if(teacher){

if(teacher.password !== password){

return res.status(400).json({
success:false,
message:"Invalid password"
});

}

return res.json({
success:true,
role:"teacher",
username:teacher.username
});

}

/* =========================
PARENT LOGIN
========================= */

const student = await Student.findOne({ studentId: username });

if(student){

if(student.password !== password){

return res.status(400).json({
success:false,
message:"Invalid password"
});

}

return res.json({
success:true,
role:"parent",
username:student.studentId
});

}

return res.status(400).json({
success:false,
message:"User not found"
});

}catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Server error"
});

}

};


// ==========================
// FETCH AADHAAR
// ==========================
exports.fetchAadhaar = async (req,res)=>{

 try{

  const {aadhaarNumber} = req.body;

  const aadhaar = await Aadhaar.findOne({aadhaarNumber});

  if(!aadhaar){
   return res.status(404).json({
    success:false,
    message:"Aadhaar not found"
   });
  }

  res.json({
   success:true,
   data:aadhaar
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};