import React, { useState } from "react";
import axios from "axios";

function StudentQR() {

const [aadhaar, setAadhaar] = useState("");
const [name, setName] = useState("");
const [fatherName, setFatherName] = useState("");
const [fatherMobile, setFatherMobile] = useState("");
const [motherName, setMotherName] = useState("");
const [motherMobile, setMotherMobile] = useState("");
const [fatherEmail, setFatherEmail] = useState("");
const [motherEmail, setMotherEmail] = useState("");
const [gender, setGender] = useState("");
const [dob, setDob] = useState("");
const [age, setAge] = useState("");
const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [address, setAddress] = useState("");


const registerStudent = async () => {

try {

const res = await axios.post("http://localhost:5000/api/students",{

aadhaar,
name,
fatherName,
fatherMobile,
motherName,
motherMobile,
fatherEmail,
motherEmail,
gender,
dob,
age,
height,
weight,
address

});

alert(res.data.message);

} catch (error) {

if(error.response){
alert(error.response.data.message);
}
else{
alert("Registration failed");
}

}

};


return (

<div style={{padding:"40px"}}>

<h2>Register Student</h2>


<input
placeholder="Aadhaar Number"
value={aadhaar}
onChange={(e)=>setAadhaar(e.target.value)}
/>

<br/><br/>

<input
placeholder="Student Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Father Name"
value={fatherName}
onChange={(e)=>setFatherName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Father Mobile"
value={fatherMobile}
onChange={(e)=>setFatherMobile(e.target.value)}
/>

<br/><br/>

<input
placeholder="Mother Name"
value={motherName}
onChange={(e)=>setMotherName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Mother Mobile"
value={motherMobile}
onChange={(e)=>setMotherMobile(e.target.value)}
/>

<br/><br/>

<input
placeholder="Father Email"
value={fatherEmail}
onChange={(e)=>setFatherEmail(e.target.value)}
/>

<br/><br/>

<input
placeholder="Mother Email"
value={motherEmail}
onChange={(e)=>setMotherEmail(e.target.value)}
/>

<br/><br/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
>
<option value="">Select Gender</option>
<option value="MALE">Male</option>
<option value="FEMALE">Female</option>
</select>

<br/><br/>

<input
type="date"
value={dob}
onChange={(e)=>setDob(e.target.value)}
/>

<br/><br/>

<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<br/><br/>

<input
placeholder="Height"
value={height}
onChange={(e)=>setHeight(e.target.value)}
/>

<br/><br/>

<input
placeholder="Weight"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
/>

<br/><br/>

<textarea
placeholder="Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>

<br/><br/>

<button onClick={registerStudent}>
Register Student
</button>

</div>

);

}

export default StudentQR;