import React,{useState} from "react";
import "../styles/AddStudentModal.css";
import {useNavigate} from "react-router-dom";

function AddStudentModal(){

const navigate = useNavigate();

const [form,setForm] = useState({

aadhaarNumber:"",
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

};

const calculateAge=(dob)=>{

const birth = new Date(dob);
const today = new Date();

let age = today.getFullYear() - birth.getFullYear();

setForm({

...form,
dob:dob,
age:age

});

};

/* ======================
REGISTER STUDENT
====================== */

const registerStudent = async()=>{

try{

const res = await fetch("http://localhost:5000/api/students",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});

const data = await res.json();

if(data.success){

alert("Student Registered Successfully");
navigate("/qr",{state:{qr:data.qrCode}});

}else{

alert(data.message);

}

}catch(error){

console.log(error);
alert("Server error");

}

};

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

<input name="aadhaarNumber" placeholder="Aadhaar Number" onChange={handleChange}/>
<input name="name" placeholder="Full Name" onChange={handleChange}/>

<input name="fatherName" placeholder="Father Name" onChange={handleChange}/>
<input name="fatherMobile" placeholder="Father Mobile" onChange={handleChange}/>

<input name="motherName" placeholder="Mother Name" onChange={handleChange}/>
<input name="motherMobile" placeholder="Mother Mobile" onChange={handleChange}/>

<input name="fatherEmail" placeholder="Father Email" onChange={handleChange}/>
<input name="motherEmail" placeholder="Mother Email" onChange={handleChange}/>

<select name="gender" onChange={handleChange}>
<option>Gender</option>
<option>Male</option>
<option>Female</option>
</select>

<input type="date" onChange={(e)=>calculateAge(e.target.value)}/>

<input value={form.age} placeholder="Age" readOnly/>

<input name="height" placeholder="Height (cm)" onChange={handleChange}/>
<input name="weight" placeholder="Weight (kg)" onChange={handleChange}/>

<textarea name="address" placeholder="Address" onChange={handleChange}></textarea>

</div>

<button
className="register-btn"
onClick={registerStudent}
>

Register Student

</button>

</div>

</div>

)

}

export default AddStudentModal;