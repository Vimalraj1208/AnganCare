import React from "react";
import { useLocation } from "react-router-dom";

function StudentQR() {

const location = useLocation();

const qr = location.state?.qr;

return (

<div style={{textAlign:"center",marginTop:"100px"}}>

<h2>Student QR Code</h2>

{qr ? (
<img src={qr} alt="QR Code" style={{width:"250px"}}/>
) : (
<p>No QR Code Found</p>
)}

<br/><br/>

<button onClick={()=>window.print()}>
Print QR
</button>

</div>

);

}

export default StudentQR;