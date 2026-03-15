import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

function AIPoseAttendance() {

const videoRef = useRef();
const navigate = useNavigate();

const [modelsLoaded, setModelsLoaded] = useState(false);
const [scanning, setScanning] = useState(false);


// LOAD MODELS
useEffect(() => {

const loadModels = async () => {

try {

await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

setModelsLoaded(true);

startCamera();

} catch (error) {

console.error("Model loading error:", error);

}

};

loadModels();

}, []);


// START CAMERA
const startCamera = () => {

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
videoRef.current.srcObject = stream;
})
.catch(err => {
console.log("Camera error:", err);
});

};


// SCAN FACE
const scanFace = async () => {

if (!modelsLoaded) {
alert("Models still loading...");
return;
}

setScanning(true);

const detection = await faceapi
.detectSingleFace(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
)
.withFaceLandmarks(true)
.withFaceDescriptor();

if (detection) {

alert("Face Detected ✅ Attendance Marked");

} else {

alert("No Face Found ❌");

}

setScanning(false);

};


// RESET CAMERA
const resetCamera = () => {

startCamera();

};


// UI
return (

<div style={{ padding: "20px", textAlign: "center" }}>

{/* HEADER */}

<div style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center"
}}>

<h2>Attendance Scanner</h2>

<button
onClick={() => navigate("/attendance")}
style={{
background: "#ff4d4f",
color: "white",
border: "none",
padding: "8px 15px",
borderRadius: "5px",
cursor: "pointer"
}}
>
Close
</button>

</div>


{/* CAMERA */}

<div style={{ marginTop: "20px" }}>

<video
ref={videoRef}
autoPlay
muted
width="400"
height="300"
style={{
border: "2px solid #ddd",
borderRadius: "10px"
}}
/>

</div>


{/* BUTTONS */}

<div style={{ marginTop: "20px" }}>

<button
onClick={scanFace}
disabled={!modelsLoaded || scanning}
style={{
background: "#28a745",
color: "white",
padding: "10px 20px",
marginRight: "10px",
border: "none",
borderRadius: "5px",
cursor: "pointer"
}}
>
Scan Face
</button>

<button
onClick={resetCamera}
style={{
background: "#007bff",
color: "white",
padding: "10px 20px",
border: "none",
borderRadius: "5px",
cursor: "pointer"
}}
>
Reset
</button>

</div>


{/* STATUS */}

<p style={{ marginTop: "10px", fontWeight: "bold" }}>

{modelsLoaded
? <span style={{ color: "green" }}>Models Loaded ✅</span>
: <span style={{ color: "orange" }}>Loading Models...</span>
}

</p>

</div>

);

}

export default AIPoseAttendance;