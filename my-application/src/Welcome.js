import React from "react";
import { useState } from 'react';
import Login from "./Login";
function Welcome() {
  const [firstName, setFirstName] = useState("neha");
  const [email, setEmail] = useState("kale@gmail.com");
  const [number, setNumber] = useState("39824");
  const [gender, setGender] = useState("male");
  const [username, setUsername] = useState("39824");
  const [password, setPassword] = useState("male");
  const [status,setstatus]=useState("true");
 
  const [showLogin, setShowLogin] = useState(false);

  function HandleClick(event){    
    event.preventDefault();
    console.log(firstName, email);

    const data = {
      firstName:firstName,
      email:email,
      number:number,
      gender:gender,
      username:username,
      password:password,
      status:status,
    }
    fetch("http://localhost:8081/student/saveData", {
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
    <div>
    {!showLogin ? (
      <>
    <div className='text-center'>
    <div className="row">
    <div className="col-md-3">
    </div>
    <div className="col-md-6" >  
      
    <form className='formStyle' onSubmit={HandleClick}>
    <h4 className="mt-2 mb-4">Register</h4>
       <input type="text" className='form-control mb-3' name="fname" placeholder='Enter First Name' onChange={(e)=> setFirstName(e.target.value)}></input>

      
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
    <button  className="mt-4" onClick={() => setShowLogin(true)}   style={{ border: "none", color: "#0d6efd", background: "none" }}>
       New Student Register here
      </button>
      
    </div>
    <div className="col-md-3">
    </div>
    </div>
    </div>
    </>
  ) : (
    <Login goBack={() => setShowLogin(false)} />
  )}
</div>
  )
}





export default Welcome;