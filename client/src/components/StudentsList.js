import React, { useEffect, useState } from "react";

function StudentsList(){

const [students,setStudents] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/students")
.then(res=>res.json())
.then(data=>{
setStudents(data);
})
.catch(err=>{
console.log(err);
});

},[]);

return(

<div style={{marginTop:"20px"}}>

<h2>Students List</h2>

<table border="1" cellPadding="10" style={{width:"100%", textAlign:"center"}}>

<thead>

<tr>
<th>Student ID</th>
<th>Name</th>
<th>Gender</th>
<th>Father</th>
<th>Mother</th>
<th>Height</th>
<th>Weight</th>
</tr>

</thead>

<tbody>

{students.length === 0 ? (

<tr>
<td colSpan="7">No Students Found</td>
</tr>

) : (

students.map((s)=>(
<tr key={s._id}>
<td>{s.studentId}</td>
<td>{s.fullName}</td>
<td>{s.gender}</td>
<td>{s.fatherName}</td>
<td>{s.motherName}</td>
<td>{s.height}</td>
<td>{s.weight}</td>
</tr>
))

)}

</tbody>

</table>

</div>

);

}

export default StudentsList;