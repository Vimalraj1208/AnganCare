const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Aadhaar = require("../models/aadhaar");


// ==========================
// REGISTER
// ==========================



exports.register = async (req, res) => {

  try {

    const { aadhaar, name, phone, email, username, password } = req.body;

    if (!aadhaar || !name || !phone || !email || !username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await Teacher.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

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
      message: "Teacher Registered Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// ==========================
// LOGIN
// ==========================
exports.login = async (req, res) => {

  try {

    const { username, password } = req.body;

    const teacher = await Teacher.findOne({ username });

    if (!teacher) {
      return res.status(400).json({
        message: "Invalid Username or Password"
      });
    }

    if (teacher.password !== password) {
      return res.status(400).json({
        message: "Invalid Username or Password"
      });
    }

    res.status(200).json({
      message: "Login Successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
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
    message:"Aadhaar not found"
   });
  }

  res.json(aadhaar);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};