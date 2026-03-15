const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");

router.get("/",async(req,res)=>{

try{

const notifications = await Notification.find().sort({date:-1});

res.json({
success:true,
data:notifications
});

}catch(err){

res.status(500).json({
success:false
});

}

});

module.exports = router;