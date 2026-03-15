import React, { useEffect, useState } from "react";
import{QRCode, QRCodeCanvas} from "qrcode.react";
import "../styles/StudentsList.css";

function StudentsList(){

const [students,setStudents] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/students")

.then(res=>res.json())

.then(data=>{

setStudents(data);

});

},[]);


/* DOWNLOAD QR */

const downloadQR = (id)=>{

const canvas = document.getElementById("qr-"+id);

const url = canvas.toDataURL("image/png");

const link = document.createElement("a");

link.href = url;
link.download = id+".png";

link.click();

}


/* NOTIFY PARENT */

const notifyParent=(mobile)=>{

alert("Redirecting to Notification Panel");

window.location.href="/notification";

}

return(

<div className="studentlist-page">

<h2>Registered Students</h2>

<table>

<thead>

<tr>

<th>Student Name</th>
<th>Student ID</th>
<th>Father</th>
<th>Father Mobile</th>
<th>Mother</th>
<th>Mother Mobile</th>
<th>QR</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{students.map((s)=>(

<tr key={s._id}>

<td>{s.name}</td>
<td>{s.username}</td>

<td>{s.fatherName}</td>
<td>{s.fatherMobile}</td>

<td>{s.motherName}</td>
<td>{s.motherMobile}</td>

<td>

<QRCodeCanvas
id={"qr-"+s.username}
value={s.username+" | "+s.name}
size={80}
/>

</td>

<td>

<button
onClick={()=>downloadQR(s.username)}
>
Download QR
</button>

<button
onClick={()=>notifyParent(s.fatherMobile)}
>
Notify
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default StudentsList;