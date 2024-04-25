import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './adminpage.css';
import { useNavigate } from "react-router-dom";

function Adminpage(){

    const navigatee = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        console.log("Logged out successfully.");
        navigatee('/login');
    }


    return(
        <>    
            <div className="adminbox1">
                <div className="adminbox2">
                    <Link to="/listtask"><button className="taskbtn9">View Task</button></Link>
                    <Link to="/createtask"><button className="taskbtn9">Create Task</button></Link>
                    <button className="logoutuser8" onClick={handleLogout}>Logout</button>
                </div>
            </div>  
            <div>  
                <ToastContainer />
            </div>    
        </>
    )
}

export default Adminpage;
