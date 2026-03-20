import React, { useRef } from "react";
import Webcam from "react-webcam";

function FaceAttendance(){

const webcamRef = useRef(null);

const detectFace = async ()=>{

try{

const imageSrc = webcamRef.current.getScreenshot();

const res = await fetch(
"http://localhost:5000/api/face-scan",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
image:imageSrc
})
}
);

const data = await res.json();

if(!data.studentId){

alert("Face not recognized");
return;

}

const mark = await fetch(
"http://localhost:5000/api/attendance/mark",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
studentId:data.studentId
})
}
);

const result = await mark.json();

alert(result.message);

}catch(err){

console.log(err);
alert("Detection error");

}

};

return(

<div style={{textAlign:"center"}}>

<h2>AI Face Attendance</h2>

<Webcam
ref={webcamRef}
audio={false}
screenshotFormat="image/jpeg"
width={400}
/>

<br/>

<button onClick={detectFace}>
Detect & Mark Attendance
</button>

</div>

)

}

export default FaceAttendance;