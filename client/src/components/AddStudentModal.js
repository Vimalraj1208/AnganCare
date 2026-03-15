import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "../styles/AddStudentModal.css";
import { useNavigate } from "react-router-dom";
function AddStudentModal({ closeModal }) {

const [form, setForm] = useState({
aadhaarNumber:"",
studentId:"",
fullName:"",
gender:"",
dob:"",
age:"",
fatherName:"",
motherName:"",
fatherNumber:"",
motherNumber:"",
location:"",
height:"",
weight:""
});

const [openCamera,setOpenCamera] = useState(false);
const webcamRef = useRef(null);
const navigate = useNavigate(); 


// ================= INPUT =================

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};


// ================= DOB → AGE =================

const handleDOB = (e)=>{

const dob = e.target.value;

const birth = new Date(dob);
const today = new Date();

let age = today.getFullYear() - birth.getFullYear();

const m = today.getMonth() - birth.getMonth();

if(m < 0 || (m===0 && today.getDate() < birth.getDate())){
age--;
}

if(age > 6){
alert("Only children under 6 allowed");
return;
}

setForm({
...form,
dob,
age
});

};


// ================= ADDRESS DETECT =================

const detectAddress = ()=>{

if(!navigator.geolocation){
alert("Geolocation not supported");
return;
}

navigator.geolocation.getCurrentPosition(async(pos)=>{

const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
);

const data = await res.json();

setForm({
...form,
location:data.display_name
});

});

};


// ================= REGISTER =================

const registerStudent = async()=>{

if(!form.aadhaarNumber || !form.studentId || !form.fullName){
alert("Aadhaar, Student ID, Name required");
return;
}

try{

const res = await fetch(
"http://localhost:5000/api/students/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
}
);

if(!res.ok){
alert("Registration failed");
return;
}

const data = await res.json();
localStorage.setItem("studentId", form.studentId);

alert(data.message || "Student Registered Successfully");

// camera open after register
setOpenCamera(true);

}catch(err){

console.log(err);
alert("Server error");

}

};


// ================= CAPTURE FACE =================

const capturePhoto = async()=>{

if(!webcamRef.current){
alert("Camera not ready");
return;
}

const imageSrc = webcamRef.current.getScreenshot();

if(!imageSrc){
alert("Capture failed");
return;
}

try{

const res = await fetch(
"http://localhost:5000/uploadFace",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
image:imageSrc,
studentId:form.studentId
})
}
);

const data = await res.json();

alert(data.message || "Face stored successfully");

setOpenCamera(false);
navigate("/attendance");

}catch(err){

console.log(err);
alert("Face upload failed");

}

};


// ================= UI =================

return(

<div className="modal-overlay" onClick={closeModal}>

<div className="modal-box" onClick={(e)=>e.stopPropagation()}>

<h2 className="modal-title">Add Student</h2>

<div className="form-grid">

<input name="aadhaarNumber" value={form.aadhaarNumber} placeholder="Aadhaar Number" onChange={handleChange}/>

<input name="studentId" value={form.studentId} placeholder="Student ID" onChange={handleChange}/>

<input name="fullName" value={form.fullName} placeholder="Child Name" onChange={handleChange}/>

<select name="gender" value={form.gender} onChange={handleChange}>
<option>Gender</option>
<option>Male</option>
<option>Female</option>
</select>

<input type="date" onChange={handleDOB}/>

<input value={form.age} placeholder="Age" readOnly/>

<input name="fatherName" value={form.fatherName} placeholder="Father Name" onChange={handleChange}/>

<input name="motherName" value={form.motherName} placeholder="Mother Name" onChange={handleChange}/>

<input name="fatherNumber" value={form.fatherNumber} placeholder="Father Phone" onChange={handleChange}/>

<input name="motherNumber" value={form.motherNumber} placeholder="Mother Phone" onChange={handleChange}/>

<input className="full" name="location" value={form.location} placeholder="Address" readOnly/>

<button className="full detect-btn" onClick={detectAddress}>
Detect Address
</button>

<input name="height" value={form.height} placeholder="Height" onChange={handleChange}/>

<input name="weight" value={form.weight} placeholder="Weight" onChange={handleChange}/>

</div>


<div className="button-row">

<button className="btn-primary" onClick={registerStudent}>
Register
</button>

<button className="btn-secondary" onClick={closeModal}>
Close
</button>

</div>

</div>


{/* CAMERA POPUP */}

{openCamera && (

<div className="camera-popup">

<Webcam
audio={false}
ref={webcamRef}
screenshotFormat="image/jpeg"
width={350}
height={260}
/>

<div style={{marginTop:"10px"}}>

<button onClick={capturePhoto}>
Capture
</button>

<button onClick={()=>setOpenCamera(false)}>
Close
</button>

</div>

</div>

)}

</div>

);

}

export default AddStudentModal;