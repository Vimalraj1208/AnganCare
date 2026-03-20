import React,{useRef} from "react";
import Webcam from "react-webcam";

function FaceCapture({studentId}){

const webcamRef = useRef(null);

const capture = async()=>{

const image = webcamRef.current.getScreenshot();

await fetch("http://localhost:5000/uploadFace",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

image,
studentId

})

})

alert("Photo captured successfully");

window.location.href="/students-list";

}

return(

<div style={{textAlign:"center"}}>

<h2>Capture Student Face</h2>

<Webcam
audio={false}
ref={webcamRef}
screenshotFormat="image/jpeg"
/>

<br/>

<button onClick={capture}>
Capture Photo
</button>

</div>

)

}

export default FaceCapture;