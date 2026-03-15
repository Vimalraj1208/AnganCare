import React, { useRef } from "react";
import Webcam from "react-webcam";

function FaceCapture() {

const webcamRef = useRef(null);

const capture = async () => {

try {

const studentId = localStorage.getItem("studentId");

if(!studentId){
alert("Student ID missing");
return;
}

const imageSrc = webcamRef.current.getScreenshot();

const res = await fetch(
"http://localhost:5000/uploadFace",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
image:imageSrc,
studentId:studentId
})
}
);

const data = await res.json();

alert("Face Stored Successfully");

}catch(err){

console.log(err);
alert("Face upload failed");

}

};

return(

<div style={{textAlign:"center"}}>

<h2>Capture Student Face</h2>

<Webcam
ref={webcamRef}
audio={false}
screenshotFormat="image/jpeg"
width={400}
/>

<br/>

<button onClick={capture}>
Capture Face
</button>

</div>

)

}

export default FaceCapture;
