import React, { useEffect, useState } from "react";

function StudentsList() {

  const [students, setStudents] = useState([]);

  // ✅ FETCH STUDENTS
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => {
        // IMPORTANT FIX 🔥
        setStudents(data.students || []);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students List</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Aadhaar</th>
              <th>Name</th>
              <th>Father</th>
              <th>Mother</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.aadhaar}</td>
                <td>{s.name}</td>
                <td>{s.fatherName}</td>
                <td>{s.motherName}</td>
                <td>{s.age}</td>
                <td>{s.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentsList;