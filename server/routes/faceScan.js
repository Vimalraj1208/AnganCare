const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", async (req, res) => {

  try {

    const { image } = req.body;

    if(!image){
      return res.json({
        studentId:null
      });
    }

    const facesDir = path.join(__dirname,"../faces");

    const files = fs.readdirSync(facesDir);

    if(files.length === 0){
      return res.json({
        studentId:null
      });
    }

    // demo detection
    const studentId = files[0].replace(".jpg","");

    res.json({
      studentId:studentId
    });

  }

  catch(err){

    console.log(err);

    res.status(500).json({
      studentId:null
    });

  }

});

module.exports = router;