import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Modal from './Modal';
import Switch from "react-switch";
function Teacher(){
const [tdata, settdata] = useState([]);
 const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

      const [name, setName] = useState("neha");
      const [email, setEmail] = useState("kale@gmail.com");
      const [number, setNumber] = useState("39824");
      const [gender, setGender] = useState("male");
      const [username, setUsername] = useState("39824");
      const [password, setPassword] = useState("male");
      const [status,setstatus]=useState("true");
      function HandleClick(event){    
        event.preventDefault();

        const data = {
          name:name,
          email:email,
          number:number,
          gender:gender,
          username:username,
          password:password,
          status:status,
        }
        fetch("http://localhost:8081/admin/saveTeacherData", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",  // Set header to indicate JSON
          },
          body: JSON.stringify(data)  // Convert data to JSON format
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Assuming the backend responds with JSON
        })
        .then(data => {
            console.log("Data saved successfully:", data);
            alert("Data saved successfully!");
            window.location.reload(); 
            handleCloseModal();
        })
        .catch(error => {
            console.error("Error saving data:", error);
            alert(`Failed to save data: ${error.message}`);
        });
      }
   
      const deleteclick=async (userid) => {
        // Find the student to toggle
        const updatedTeacher= tdata.find((teacher) => teacher.userid === userid);
    
      
        // Update the student's status locally
       
        try {
          // Send the update call to the backend
          const response = await fetch(`http://localhost:8081/admin/deleteTeacher/${userid}`, {
            method: "DELETE", // Or PUT, depending on your backend API
            
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.text();
          console.log("Teacher  deleted successfully!:", result);
          alert("Teacher  deleted successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error updating student status:", error);
          alert("Failed to deteletteacher. Please try again.");
    
          // Rollback the local change on error
         
        }
      };

      const handleToggleChange = async (userid) => {
        // Find the student to toggle
        const updatedTeacher= tdata.find((teacher) => teacher.userid === userid);
    
        if (!updatedTeacher) return;
    
        const newStatus = !updatedTeacher.status; // Toggle the status
    
        // Update the student's status locally
        settdata((prevStdData) =>
          prevStdData.map((teacher) =>
            teacher.userid === userid ? { ...teacher, status: newStatus } : teacher
          )
        );
    
        try {
          // Send the update call to the backend
          const response = await fetch(`http://localhost:8081/admin/updateStatus`, {
            method: "POST", // Or PUT, depending on your backend API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userid: userid,
              status: newStatus,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log("Student status updated successfully:", result);
          alert("Student status updated successfully!");
        } catch (error) {
          console.error("Error updating student status:", error);
          alert("Failed to update student status. Please try again.");
    
          // Rollback the local change on error
          settdata((prevStdData) =>
            prevStdData.map((student) =>
              student.userid === userid ? { ...student, status: !newStatus } : student
            )
          );
        }
      };

  useEffect(() => {
    fetch("http://localhost:8081/admin/getTeacherData", {
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
        settdata(data); // Initialize the table data
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
        alert(`Failed to retrieve data: ${error.message}`);
      });
  }, []);


    return(
        <>
           <h2 className="text-center">Add Teacher</h2>
           <button  onClick={handleOpenModal} className="btn btn-primary m-4">Create Teacher</button>
          <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
       
       
        <form className='formStyle' onSubmit={HandleClick}>
   
       <input type="text" className='form-control mb-3' name="fname" placeholder='Enter First Name' onChange={(e)=> setName(e.target.value)}></input>

      
       <input type="email" className='form-control mb-3' name="email" placeholder='Enter Email' onChange={e=> setEmail(e.target.value)}></input>

      
       <input type="number" className='form-control mb-3' name="number" placeholder='Enter Mobile Number' onChange={e=> setNumber(e.target.value)}></input>
     
       
       <select className='form-control mb-3' name="gender" id="Gender" onChange={e=> setGender(e.target.value)}>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        </select>
        
        <input type="text" className='form-control mb-3' name="username" placeholder='Enter username' onChange={e=> setUsername(e.target.value)}></input>

      
       <input type="password" className='form-control mb-3' name="password" placeholder='Enter password' onChange={e=> setPassword(e.target.value)}></input>

        
       <input className="btn btn-primary" type='submit'></input>
    </form>
      </Modal>
       
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
          {tdata.map((teacher) => (
            <tr key={teacher.userid}>
              <td>{teacher.userid}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.number}</td>
              <td>{teacher.gender}</td>
              <td>
                <Switch
                  onChange={() => handleToggleChange(teacher.userid)}
                  checked={teacher.status}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                />
              </td>
              <td>
              <svg onClick={() => deleteclick(teacher.userid)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{cursor:"pointer"}} class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    )
}
export default Teacher;