import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FaceCapture(){

const videoRef = useRef(null);
const canvasRef = useRef(null);

const navigate = useNavigate();

const [image,setImage] = useState(null);


/* ===============================
CAMERA AUTO OPEN
================================ */

useEffect(()=>{

navigator.mediaDevices.getUserMedia({ video:true })

.then(stream=>{

videoRef.current.srcObject = stream;

})

.catch(err=>{

alert("Camera access denied");

});

},[]);



/* ===============================
CAPTURE IMAGE
================================ */

const capture = ()=>{

const video = videoRef.current;
const canvas = canvasRef.current;

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(video,0,0);

const dataURL = canvas.toDataURL("image/png");

setImage(dataURL);

};



/* ===============================
SAVE IMAGE
================================ */

const saveFace = async ()=>{

try{

await fetch("http://localhost:5000/uploadFace",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
image:image
})

});

alert("Face captured successfully");

/* Next step → QR */

navigate("/generate-qr");

}catch(err){

alert("Face upload error");

}

};



return(

<div style={{textAlign:"center",padding:"40px"}}>

<h2>Capture Student Face</h2>

<video
ref={videoRef}
autoPlay
width="400"
height="300"
style={{borderRadius:"10px"}}
/>

<br/><br/>

<button onClick={capture}>
Capture
</button>


<br/><br/>

{image && (

<div>

<img src={image} width="200"/>

<br/><br/>

<button onClick={saveFace}>
Save Face
</button>

</div>

)}

<canvas ref={canvasRef} style={{display:"none"}}/>

</div>

)

}

export default FaceCapture;