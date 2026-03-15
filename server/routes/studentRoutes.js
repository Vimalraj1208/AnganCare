const express = require("express");
const router = express.Router();

const {
  registerStudent,
  getStudents
} = require("../controllers/studentController");


// Register student
router.post("/register", registerStudent);


// Get all students
router.get("/", getStudents);


module.exports = router;