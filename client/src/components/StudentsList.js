import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentsList(){

const [students,setStudents] = useState([]);

useEffect(()=>{
fetchStudents();
},[]);

const fetchStudents = async()=>{

try{

const res = await axios.get("http://localhost:5000/api/students");

console.log("API DATA:",res.data); // debug

setStudents(res.data);

}catch(err){

console.log(err);

}

};

return(

<div style={{padding:"30px"}}>

<h2>Registered Students</h2>

<table border="1" width="100%" cellPadding="10">

<thead>

<tr>
<th>Student Name</th>
<th>Student ID</th>
<th>Father</th>
<th>Father Mobile</th>
<th>Mother</th>
<th>Mother Mobile</th>
<th>QR</th>
</tr>

</thead>

<tbody>

{students.length === 0 ? (
<tr>
<td colSpan="7">No Students Found</td>
</tr>
) : (

students.map((student,index)=>(
<tr key={index}>

<td>{student.name}</td>
<td>{student.aadhaarNumber}</td>
<td>{student.fatherName}</td>
<td>{student.fatherMobile}</td>
<td>{student.motherName}</td>
<td>{student.motherMobile}</td>

<td>
{student.qrCode && (
<img src={student.qrCode} alt="QR" width="60"/>
)}
</td>

</tr>
))

)}

</tbody>

</table>

</div>

);

}

export default StudentsList;