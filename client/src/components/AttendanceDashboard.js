import React, { useEffect, useState } from "react";

function AttendanceDashboard(){

const [stats,setStats] = useState({
total:0,
present:0,
absent:0
});

const fetchStats = ()=>{

fetch("http://localhost:5000/api/dashboard")
.then(res=>res.json())
.then(data=>{
setStats(data);
});

};

useEffect(()=>{

fetchStats();

},[]);

return(

<div style={{textAlign:"center"}}>

<h2>Dashboard</h2>

<p>Total Students : {stats.total}</p>

<p>Present Today : {stats.present}</p>

<p>Absent Today : {stats.absent}</p>

</div>

)

}

export default AttendanceDashboard;