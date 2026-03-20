import React, { useState } from "react";
import "../styles/AddStudentModal.css";
import { useNavigate } from "react-router-dom";

function AddStudentModal() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    aadhaar: "",
    name: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    fatherEmail: "",
    motherEmail: "",
    gender: "",
    dob: "",
    age: "",
    address: "",
    height: "",
    weight: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    setForm({
      ...form,
      dob: dob,
      age: age
    });
  };

  const registerStudent = async () => {
    try {

      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert("Student Registered Successfully ✅");
        navigate("/face", { state: { qr: data.qrCode } });
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="student-page">
      <div className="student-card">

        <div className="form-header">
          <h2>Student Registration</h2>

          <button
            className="close-btn"
            onClick={() => navigate("/attendance")}
          >
            ✖
          </button>
        </div>

        <div className="student-grid">

          {/* ✅ VALUE ADDED */}
          <input name="aadhaar" value={form.aadhaar} placeholder="Aadhaar Number" onChange={handleChange}/>
          <input name="name" value={form.name} placeholder="Full Name" onChange={handleChange}/>

          <input name="fatherName" value={form.fatherName} placeholder="Father Name" onChange={handleChange}/>
          <input name="fatherMobile" value={form.fatherMobile} placeholder="Father Mobile" onChange={handleChange}/>

          <input name="motherName" value={form.motherName} placeholder="Mother Name" onChange={handleChange}/>
          <input name="motherMobile" value={form.motherMobile} placeholder="Mother Mobile" onChange={handleChange}/>

          <input name="fatherEmail" value={form.fatherEmail} placeholder="Father Email" onChange={handleChange}/>
          <input name="motherEmail" value={form.motherEmail} placeholder="Mother Email" onChange={handleChange}/>

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input type="date" value={form.dob} onChange={(e)=>calculateAge(e.target.value)}/>

          <input value={form.age} placeholder="Age" readOnly/>

          <input name="height" value={form.height} placeholder="Height (cm)" onChange={handleChange}/>
          <input name="weight" value={form.weight} placeholder="Weight (kg)" onChange={handleChange}/>

          <textarea name="address" value={form.address} placeholder="Address" onChange={handleChange}></textarea>

        </div>

        <button className="register-btn" onClick={registerStudent}>
          Register Student
        </button>

      </div>
    </div>
  );
}

export default AddStudentModal;