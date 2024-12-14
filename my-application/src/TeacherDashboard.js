import React from "react";
import { useState } from "react";
import { useEffect } from "react";
function TeacherDashboard(){
 const [stddata, setStdData] = useState([]);
     useEffect(() => {
        fetch("http://localhost:8081/student/getData", {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            return response.json(); // Convert response to JSON
          })
          .then((data) => {
            console.log(data);
            setStdData(data); // Initialize the table data
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
            alert(`Failed to retrieve data: ${error.message}`);
          });
      }, []);
    return(
    <>
     <h2 className="text-center m-2">Student List</h2>
     <table
        className="table"
        border="1"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stddata.map((student) => (
            <tr key={student.userid}>
              <td>{student.userid}</td>
              <td>{student.firstName}</td>
              <td>{student.email}</td>
              <td>{student.number}</td>
              <td>{student.gender}</td>
              <td>
              {student.status}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
    )
}

export default TeacherDashboard;