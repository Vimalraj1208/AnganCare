const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"student"
  },

  date:{
    type:String
  },

  checkin:{
    type:Date
  },

  checkout:{
    type:Date
  }

},{timestamps:true});

module.exports = mongoose.model("attendance",attendanceSchema);