import React from "react";

function Physical() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Physical Growth</h2>

      <input placeholder="Height (cm)" />
      <input placeholder="Weight (kg)" />
      <input placeholder="BMI" />

      <button>Save</button>
    </div>
  );
}

export default Physical;