import React, { useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner(){

useEffect(()=>{

const scanner = new Html5QrcodeScanner(
"reader",
{ 
fps:10,
qrbox:250
}
);

scanner.render(success, error);

function success(result){

console.log("QR RESULT:",result);

axios.post("http://localhost:5000/api/attendance/scan",{

aadhaar:result

})
.then(res=>{

alert(res.data.message);

})
.catch(err=>{

console.log(err);
alert("Attendance failed");

});

scanner.clear();

}

function error(err){
console.log(err);
}

},[]);

return(

<div style={{textAlign:"center",padding:"30px"}}>

<h2>QR Attendance Scanner</h2>

<div id="reader" style={{width:"350px",margin:"auto"}}></div>

</div>

);

}

export default QRScanner;