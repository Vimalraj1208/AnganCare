import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

const [students,setStudents] = useState([]);
const [attendance,setAttendance] = useState([]);

useEffect(()=>{

fetchStudents();
fetchAttendance();

},[]);


const fetchStudents = async ()=>{

try{

const res = await axios.get("http://localhost:5000/api/students");

setStudents(res.data);

}catch(error){

console.log(error);

}

};


const fetchAttendance = async ()=>{

try{

const res = await axios.get("http://localhost:5000/api/attendance");

setAttendance(res.data);

}catch(error){

console.log(error);

}

};


const totalStudents = students.length;
const presentToday = attendance.length;
const absentToday = totalStudents - presentToday;


return(

<div style={{padding:"40px"}}>

<h2>Anganwadi Dashboard</h2>

<div style={{display:"flex",gap:"20px"}}>

<div style={{background:"#4CAF50",padding:"20px",color:"white"}}>

<h3>Total Students</h3>

<h1>{totalStudents}</h1>

</div>


<div style={{background:"#2196F3",padding:"20px",color:"white"}}>

<h3>Present Today</h3>

<h1>{presentToday}</h1>

</div>


<div style={{background:"#f44336",padding:"20px",color:"white"}}>

<h3>Absent Today</h3>

<h1>{absentToday}</h1>

</div>

</div>

</div>

);

}

export default Dashboard;