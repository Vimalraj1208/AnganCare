import React, {useEffect,useState} from "react";

function Notification(){

const [notifications,setNotifications] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/notifications")
.then(res=>res.json())
.then(data=>{

if(data.success){
setNotifications(data.data);
}

});

},[]);

return(

<div style={{padding:"30px"}}>

<h2>Parent Notifications</h2>

{notifications.map((n,index)=>(

<div key={index} style={{
border:"1px solid #ddd",
padding:"10px",
marginBottom:"10px",
borderRadius:"6px"
}}>

<p>{n.message}</p>
<small>{new Date(n.date).toLocaleString()}</small>

</div>

))}

</div>

);

}

export default Notification;