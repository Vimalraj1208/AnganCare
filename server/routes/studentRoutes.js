const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/studentController");
const Student = require("../models/student");

router.post("/register", registerStudent);

router.get("/", async (req,res)=>{
  const students = await Student.find();
  res.json(students);
});

module.exports = router;