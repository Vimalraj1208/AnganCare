import React, { useEffect, useState } from "react";

function StudentsList() {

  const [students, setStudents] = useState([]);

  // 🔥 FETCH STUDENTS
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);

        // Handle both formats safely
        if (data && Array.isArray(data.students)) {
          setStudents(data.students);
        } else if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })
      .catch(err => {
        console.log(err);
        setStudents([]);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students List</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
          
          {/* TABLE HEADER */}
          <thead>
            <tr>
              <th>Aadhaar</th>
              <th>Name</th>
              <th>Father</th>
              <th>Father Mobile</th>
              <th>Mother</th>
              <th>Mother Mobile</th>
              <th>Age</th>
              <th>Gender</th>
              <th>QR</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.aadhaar || s.aadhaarNumber}</td>
                <td>{s.name}</td>
                <td>{s.fatherName}</td>
                <td>{s.fatherMobile}</td>
                <td>{s.motherName}</td>
                <td>{s.motherMobile}</td>
                <td>{s.age}</td>
                <td>{s.gender}</td>

                {/* QR DISPLAY */}
                <td>
                  {s.qrCode ? (
                    <a href={s.qrCode} download={`QR_${s.name}.png`}>
                      <img 
                        src={s.qrCode} 
                        alt="QR" 
                        width="70" 
                        style={{ cursor: "pointer" }}
                      />
                    </a>
                  ) : (
                    "No QR"
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default StudentsList;