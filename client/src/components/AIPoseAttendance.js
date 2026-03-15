import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { Html5QrcodeScanner } from "html5-qrcode";

function AIPoseAttendance(){

const videoRef = useRef(null);
const detectorRef = useRef(null);
const scannerRef = useRef(null);

const [status,setStatus] = useState("Starting...");
const [mode,setMode] = useState(null);
const [handDetected,setHandDetected] = useState(false);

const attendanceDone = useRef(false);


// ---------------- INIT ----------------

useEffect(()=>{
init();
},[]);

const init = async ()=>{

await tf.ready();
await tf.setBackend("webgl");

startCamera();
loadModel();

};


// ---------------- CAMERA ----------------

const startCamera = async ()=>{

const stream = await navigator.mediaDevices.getUserMedia({
video:true
});

videoRef.current.srcObject = stream;

videoRef.current.onloadedmetadata = ()=>{

videoRef.current.play();

setStatus("Camera Ready");

detectPoseLoop();

};

};


// ---------------- STOP CAMERA ----------------

const stopCamera = ()=>{

const stream = videoRef.current.srcObject;

if(stream){

stream.getTracks().forEach(track=>track.stop());

}

};


// ---------------- LOAD MODEL ----------------

const loadModel = async ()=>{

const detector = await poseDetection.createDetector(
poseDetection.SupportedModels.MoveNet
);

detectorRef.current = detector;

};


// ---------------- POSE LOOP ----------------

const detectPoseLoop = async ()=>{

if(!detectorRef.current){

requestAnimationFrame(detectPoseLoop);
return;

}

const poses = await detectorRef.current.estimatePoses(videoRef.current);

if(poses.length>0){

const keypoints = poses[0].keypoints;

const nose = keypoints.find(k=>k.name==="nose");
const rightWrist = keypoints.find(k=>k.name==="right_wrist");
const leftWrist = keypoints.find(k=>k.name==="left_wrist");

if(!handDetected){

// CHECK IN

if(rightWrist && nose && rightWrist.y < nose.y){

setMode("checkin");
setHandDetected(true);

setStatus("Right Hand Detected → Check In");

startQR();

}

// CHECK OUT

if(leftWrist && nose && leftWrist.y < nose.y){

setMode("checkout");
setHandDetected(true);

setStatus("Left Hand Detected → Check Out");

startQR();

}

}

}

requestAnimationFrame(detectPoseLoop);

};


// ---------------- QR SCANNER ----------------

const startQR = ()=>{

setStatus("Scan Student QR");

scannerRef.current = new Html5QrcodeScanner(
"qr-reader",
{ fps:10, qrbox:250 },
false
);

scannerRef.current.render(

(decodedText)=>{

if(attendanceDone.current) return;

attendanceDone.current = true;

markAttendance(decodedText);

scannerRef.current.clear();

},

(error)=>{}

);

};


// ---------------- ATTENDANCE API ----------------

const markAttendance = async (studentId)=>{

try{

setStatus("Marking attendance...");

const res = await fetch(
"http://localhost:5000/api/attendance/mark",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
studentId,
type:mode
})
}
);

if(res.ok){

setStatus("Attendance Marked");

stopCamera(); // camera OFF

resetSystem();

}

}catch(err){

setStatus("Server Error");

}

};


// ---------------- RESET SYSTEM ----------------

const resetSystem = ()=>{

setTimeout(()=>{

attendanceDone.current=false;
setHandDetected(false);
setMode(null);

setStatus("Ready for next student");

startCamera(); // camera restart

},4000);

};


// ---------------- UI ----------------

return(

<div style={{textAlign:"center"}}>

<h2>AI Attendance System</h2>

<p>{status}</p>

<video
ref={videoRef}
autoPlay
playsInline
width="400"
style={{
border:"2px solid #ccc",
borderRadius:"10px",
transform:"scaleX(-1)"
}}
/>

<div
id="qr-reader"
style={{
width:"300px",
margin:"20px auto"
}}
/>

<p>

Raise Right Hand → Check In  
<br/>
Raise Left Hand → Check Out

</p>

</div>

);

}

export default AIPoseAttendance;