import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import successSound from "../assets/success.wav";

function QRScanner() {

  const [result, setResult] = useState("");

  const markAttendance = async (studentId) => {
    try {
      console.log("📡 Sending:", studentId);

      const res = await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentId })
      });

      const data = await res.json();

      console.log("📡 Response:", data);

      if (data.success) {

        // 🔊 play sound
        const audio = new Audio(successSound);
        audio.play();

        alert("✅ Attendance Marked");

      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Attendance failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>QR Scanner</h2>

      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            const text = result?.text;

            console.log("QR:", text);

            setResult(text);

            if (text && text.includes("STUDENT_ID:")) {

              const studentId = text.split("STUDENT_ID:")[1]?.trim();

              console.log("🔥 FINAL ID:", studentId);

              markAttendance(studentId);

            } else {
              alert("Invalid QR");
            }
          }

          if (!!error) {
            console.log(error);
          }
        }}
        style={{ width: "300px" }}
      />

      <p>{result}</p>
    </div>
  );
}

export default QRScanner;