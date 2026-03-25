import React, { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

function Motor() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 🔴 DRAW LANDMARKS
      if (results.poseLandmarks) {

        results.poseLandmarks.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x * 400, point.y * 300, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        });

        // 🔥 MOTOR LOGIC
        const left = results.poseLandmarks[15];
        const right = results.poseLandmarks[16];

        if (left && right) {

          const distance = Math.abs(left.x - right.x);

          let newScore = 0;

          if (distance > 0.3) newScore = 100;
          else if (distance > 0.2) newScore = 70;
          else newScore = 40;

          setScore(newScore);

          console.log("Motor Score:", newScore);
        }
      }
    });

    if (videoRef.current) {

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 400,
        height: 300
      });

      camera.start();
    }

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Motor Skill AI</h2>

      {/* VIDEO + CANVAS */}
      <div style={{ position: "relative", width: "400px" }}>

        <video
          ref={videoRef}
          style={{
            width: "400px",
            borderRadius: "10px"
          }}
        />

        <canvas
          ref={canvasRef}
          width="400"
          height="300"
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        />

      </div>

      {/* SCORE UI */}
      <h3 style={{ marginTop: "15px" }}>
        Motor Score: {score}
      </h3>

    </div>
  );
}

export default Motor;