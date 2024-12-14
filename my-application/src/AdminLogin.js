import React from "react";
import { useState } from "react";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
function AdminLogin({ goBack }) {

    const [username, setUsername] = useState("39824");
    const [password, setPassword] = useState("male");
    const navigate = useNavigate();

    function LoginClick(event){  
      event.preventDefault(); 
      fetch(`http://localhost:8081/admin/getData/${username}/${password}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
         
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
        //  alert("Data retrieved successfully:", data);
           console.log(data);
           if(data.hasOwnProperty("status")){
            if(data.status){
            navigate("/TeacherDashboard");
            }else{
                window.confirm("You are blocked by admin ");
            }
           }else{
            alert("else");
            navigate("/Dashboard");
           }
          // Do something with the retrieved data
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
          alert(`Failed to retrieve data: ${error.message}`);
        });
    }



  return (
    <div className="text-center">
      {/* Login Component Content */}
    <div className="row">
    <div className="col-md-3">
    </div>
    <div className="col-md-6" >  
      
    <form className='formStyle' onSubmit={LoginClick}>
    <h4 className="mt-2 mb-4">Admin/Teacher Login</h4>
    <input type="text" className='form-control mb-3' name="username" placeholder='Enter username' onChange={e=> setUsername(e.target.value)}></input>

      
       <input type="password" className='form-control mb-3' name="password" placeholder='Enter password' onChange={e=> setPassword(e.target.value)}></input>

        
       <input className="btn btn-primary" type='submit'></input>
       <label  className="mt-3" id="label1" style={{color:"Green",display:"none"}}>Login successfully</label>
       <label className="mt-3" id="label2" style={{color:"red",display:"none"}}>Invalid username or password</label>
    </form>
    </div>
    <div className="col-md-3">
    </div>
    </div>
      <button  className="mt-4" onClick={goBack}   style={{ border: "none", color: "#0d6efd", background: "none" }}>
      Back to Register 
      </button>
    </div>
  );
}

export default AdminLogin;