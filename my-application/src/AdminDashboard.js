import React from "react";
import "./AdminDashboard.css"
import { Link } from "react-router-dom";
function AdminDashboard({ goBack }) {
    return(
    <>
    <div className="main-div">
        <div className="sub-div" ><h1>Create/View Teacher</h1>
        <Link to="/Teacher" class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-edit mr-2"></span>
          <span class="glyphicon glyphicon-eye-open icon"></span>
        </Link>
        </div>
        <div className="sub-div"><h1>Create/View Student</h1>
        <Link to="/StudentData" class="btn btn-info btn-lg">
        <span class="glyphicon glyphicon-edit mr-2"></span>
        <span class="glyphicon glyphicon-eye-open icon"></span>
        </Link>
        </div>
    </div>
    </>
    )
}
export default AdminDashboard;