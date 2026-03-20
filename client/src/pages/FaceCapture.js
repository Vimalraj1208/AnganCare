import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";

function FaceCapture(){

const webcamRef = useRef(null);
const location = useLocation();
const navigate = useNavigate();

const [image, setImage] = useState(null);
const [cameraOn, setCameraOn] = useState(true);

const capture = () => {

const screenshot = webcamRef.current.getScreenshot();
setImage(screenshot);

// 🔥 camera OFF
setCameraOn(false);

};

const saveImage = async () => {

await fetch("http://localhost:5000/api/upload-face",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ image })
});

alert("Face Saved");

// 👉 go attendance
navigate("/attendance-marker");

};

const printQR = () => {

const win = window.open("");
win.document.write(`<img src="${location.state?.qr}" />`);
win.print();

};

return (

<div style={{textAlign:"center"}}>

<h2>Face Capture</h2>

{/* CLOSE BUTTON */}
<button onClick={()=>navigate("/dashboard")}>❌ Close</button>

<br/><br/>

{/* CAMERA */}
{cameraOn && (
<Webcam
ref={webcamRef}
screenshotFormat="image/jpeg"
width={300}
/>
)}

<br/>

{cameraOn && <button onClick={capture}>Capture</button>}

<br/><br/>

{/* IMAGE */}
{image && (
<>
<img src={image} width={200}/>
<br/>
<button onClick={saveImage}>Save & Continue</button>
</>
)}

<br/><br/>

{/* QR */}
{location.state?.qr && (
<>
<img src={location.state.qr} width={200}/>
<br/>
<button onClick={printQR}>🖨 Print QR</button>
</>
)}

</div>

);

}

export default FaceCapture;