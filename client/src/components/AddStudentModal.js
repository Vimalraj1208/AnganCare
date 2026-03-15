import React, { useState } from "react";
import "../styles/AddStudentModal.css";
import { useNavigate } from "react-router-dom";

function AddStudentModal(){

const [form,setForm] = useState({

aadhaar:"",
name:"",
fatherName:"",
fatherMobile:"",
motherName:"",
motherMobile:"",
fatherEmail:"",
motherEmail:"",
gender:"",
dob:"",
age:"",
address:"",
height:"",
weight:""

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const calculateAge=(dob)=>{

const birth = new Date(dob);
const today = new Date();

let age = today.getFullYear() - birth.getFullYear();

if(age>6){

alert("Child age must be below 6 years");
return;

}

setForm({

...form,
dob:dob,
age:age

})

}

const navigate = useNavigate();
return(

<div className="student-page">

<div className="student-card">

<div className="form-header">

<h2>Student Registration</h2>

<button
className="close-btn"
onClick={()=>navigate("/attendance")}
>
✖
</button>

</div>

<div className="student-grid">

<input name="aadhaar" placeholder="Aadhaar Number" onChange={handleChange}/>
<input name="name" placeholder="Full Name" onChange={handleChange}/>

<input name="fatherName" placeholder="Father Name" onChange={handleChange}/>
<input name="fatherMobile" placeholder="Father Mobile" onChange={handleChange}/>

<input name="motherName" placeholder="Mother Name" onChange={handleChange}/>
<input name="motherMobile" placeholder="Mother Mobile" onChange={handleChange}/>

<input name="fatherEmail" placeholder="Father Email"/>
<input name="motherEmail" placeholder="Mother Email"/>

<select name="gender" onChange={handleChange}>
<option>Gender</option>
<option>Male</option>
<option>Female</option>
</select>

<input type="date" onChange={(e)=>calculateAge(e.target.value)}/>

<input value={form.age} placeholder="Age" readOnly/>

<input name="height" placeholder="Height (cm)"/>
<input name="weight" placeholder="Weight (kg)"/>

<textarea name="address" placeholder="Address"></textarea>

</div>

<button className="register-btn">
Register Student
</button>

</div>

</div>

)
}

export default AddStudentModal;