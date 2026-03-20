import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AttendanceMarker() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  // START CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied ❌");
    }
  };

  // STOP CAMERA
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  // CAPTURE IMAGE
  const capture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video.videoWidth) {
      alert("Start camera first ❗");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const data = canvas.toDataURL("image/png");
    setImage(data);

    stopCamera(); // auto stop camera
  };

  // MARK ATTENDANCE
  const markAttendance = async () => {

    try {

      const res = await axios.post("http://localhost:5000/api/faceScan", {
        image
      });

      setStatus("✅ Attendance Marked Successfully");
      alert(res.data.message);

    } catch (err) {
      console.log(err);
      setStatus("❌ Attendance Failed");
      alert("Server error ❌");
    }

  };

  return (

    <div style={{ padding: "30px", textAlign: "center", background:"#f5f6fa", minHeight:"100vh" }}>

      <h2>📷 Attendance Marker</h2>

      {/* 🔥 TOP STATS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "20px"
      }}>
        <div style={cardStyle}>👶 Total: 25</div>
        <div style={cardStyle}>✅ Present: 18</div>
        <div style={cardStyle}>❌ Absent: 7</div>
      </div>

      {/* CLOSE BUTTON */}
      <button 
        onClick={() => navigate("/attendance")}
        style={closeBtn}
      >
        ❌ Close
      </button>

      <br /><br />

      {/* CAMERA BOX */}
      <div style={cameraBox}>
        <video ref={videoRef} autoPlay style={{ width: "100%", borderRadius:"10px" }}></video>
      </div>

      <br />

      {/* ACTION BUTTONS */}
      <button onClick={startCamera} style={btn}>🎥 Start Camera</button>
      <button onClick={capture} style={btn}>📸 Capture</button>

      <br /><br />

      {/* PREVIEW */}
      {image && (
        <div>
          <h4>Preview</h4>
          <img src={image} alt="capture" width="200" style={{borderRadius:"10px"}} />
          <br /><br />
          <button onClick={markAttendance} style={successBtn}>
            ✅ Mark Attendance
          </button>
        </div>
      )}

      {/* STATUS */}
      <h3>{status}</h3>

      {/* 🔥 QUICK ACTIONS */}
      <div style={{marginTop:"30px"}}>
        <h4>⚡ Quick Actions</h4>

        <button 
          onClick={() => navigate("/qr-scanner")}
          style={btn}
        >
          🔳 Scan QR
        </button>

        <button 
          onClick={() => navigate("/dashboard")}
          style={btn}
        >
          📊 View Dashboard
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

    </div>
  );
}

export default AttendanceMarker;


/* 🔥 STYLES */

const cardStyle = {
  background: "#fff",
  padding: "12px 20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const btn = {
  margin: "5px",
  padding: "10px 15px",
  border: "none",
  background: "#007bff",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer"
};

const successBtn = {
  padding: "10px 15px",
  border: "none",
  background: "green",
  color: "#fff",
  borderRadius: "5px"
};

const closeBtn = {
  background: "red",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px"
};

const cameraBox = {
  width: "320px",
  margin: "auto",
  background: "#000",
  padding: "10px",
  borderRadius: "10px"
};