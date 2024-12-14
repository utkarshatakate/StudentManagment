import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './Student.css';
 

function Student()
{
     const [firstName, setFirstName] = useState("neha");
      const [email, setEmail] = useState("kale@gmail.com");
    
      const [userid,setUserId]=useState(0);
   
//   const[studentData,setData]=useState([]);
    const value=localStorage.getItem("studId");

    const [studentData, setStudentData] = useState({
        userid:0,
        firstName:"",
        email: "",
        number: "",
        gender: "",
        username: "",
        password: "",
      });
    useEffect(()=>{
       fetch(`http://localhost:8081/student/getDataByLogin/${value}`, {
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
            setStudentData(data);
           })
           .catch((error) => {
             console.error("Error retrieving data:", error);
             alert(`Failed to retrieve data: ${error.message}`);
           });
   }, [value]) 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the specific field in the state
    }));
  };
   function UpdateClick(event){    
    event.preventDefault();

    const data = {
      userid:studentData.userid,
      firstName:studentData.firstName,
      email:studentData.email,
      number:studentData.number,
      gender:studentData.gender,
      username:studentData.username,
      password:studentData.password,
    }
    fetch("http://localhost:8081/student/updateData", {
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
    })
    .catch(error => {
        console.error("Error saving data:", error);
        alert(`Failed to save data: ${error.message}`);
    });
  }

    return(
        <> 
        <div className='text-center'>
        <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6" >  
          
        <form className='formStyle'  onSubmit={UpdateClick}>
        <h4 className="mt-2 mb-4">Student Information</h4>
        <input type="text" className='form-control mb-3 up-lb' style={{display:"none"}} value={studentData.userid} name="fname" placeholder='Enter First Name' onChange={handleChange}></input>
      <div className="span-div">
       <span className="mt-2">Name:</span><input
              type="text"
              className="form-control mb-3 up-lb"
              name="firstName"
              value={studentData.firstName}
              placeholder="Enter First Name"
              onChange={handleChange}
            />
            </div>
<div className="span-div">
       <span className="mt-2">Email:</span><input
              type="email"
              className="form-control mb-3 up-lb"
              name="email"
              value={studentData.email}
              placeholder="Enter Email"
              onChange={handleChange}
            />
            </div>
<div className="span-div">
        <span className="mt-2">Mobile Number:</span> <input
              type="number"
              className="form-control mb-3 up-lb"
              name="number"
              value={studentData.number}
              placeholder="Enter Mobile Number"
              onChange={handleChange}
            />
            </div>
<div className="span-div">
<span className="mt-2">Gender:</span>    <select
              className="form-control mb-3 up-lb"
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            </div>

<div className="span-div">
            <span className="mt-2">Username:</span>       <input
              type="text"
              className="form-control mb-3 up-lb"
              name="username"
              value={studentData.username}
              placeholder="Enter Username"
              onChange={handleChange}
            />
</div>
<div className="span-div">
<span className="mt-2">Password:</span>    <input
              type="password"
              className="form-control mb-3 up-lb"
              name="password"
              value={studentData.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
            </div>
    <input
              className="btn btn-primary"
              type="submit"
              value="Update"
            />
        </form>
        </div>
        <div className="col-md-6" > 
         </div>
        </div>
        </div>
        </>
       
    )
}

export default Student;