const Attendance = require("../models/attendance");
const Student = require("../models/student");

// ================= MARK ATTENDANCE =================

exports.markAttendance = async (req, res) => {

  try {

    const { studentId } = req.body;

    if(!studentId){
      return res.status(400).json({
        message: "Student ID required"
      });
    }

    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // today date start
    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    // today date end
    const todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    const hour = new Date().getHours();

    // find today's attendance
    let attendance = await Attendance.findOne({
      studentId: student._id,
      date: {
        $gte: todayStart,
        $lte: todayEnd
      }
    });


    // ================= MORNING CHECK-IN =================

    if(hour < 12){

      if(attendance){
        return res.json({
          message:"Check-in already done"
        });
      }

      attendance = new Attendance({
        studentId: student._id,
        date: new Date(),
        checkin: new Date()
      });

      await attendance.save();

      return res.json({
        message:"Check-in marked",
        student: student.fullName
      });

    }


    // ================= EVENING CHECK-OUT =================

    else{

      if(!attendance){
        return res.json({
          message:"Check-in not found"
        });
      }

      if(attendance.checkout){
        return res.json({
          message:"Check-out already done"
        });
      }

      attendance.checkout = new Date();

      await attendance.save();

      return res.json({
        message:"Check-out marked",
        student: student.fullName
      });

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server error"
    });

  }

};



// ================= GET ALL ATTENDANCE =================

exports.getAllAttendance = async (req, res) => {

  try {

    const list = await Attendance
      .find()
      .populate("studentId","fullName studentId")
      .sort({date:-1});

    res.json(list);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:"Server error"
    });

  }

};