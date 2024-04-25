import React, { useState, useEffect } from "react";
import './listtask.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import './userpage.css';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Userpage() {
    const [tasks, setTasks] = useState([]);
    const navigate=useNavigate()

    const handleviewtask=(taskId)=>{
        navigate(`/usertaskpage/${taskId}`);
    }

    const navigatee = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");
        console.log("Logged out successfully.");
        navigatee('/login');
      }



    useEffect(() => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        axios.get(`http://127.0.0.1:8000/myapp1/usertask?user_id=${decoded.user_id}`)
            .then(response => {
                setTasks(response.data);
                console.log("fetch complete", response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);

    return (
        <>
            
            <div className="listtaskmain1">
                <div className="listtaskmain6">
                    <div className="listtaskmain7">
                        <button className="listtaskmain8" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="listtaskmain2">
                    {tasks.map(task => (
                            <div className="listtaskmain3" key={task.id}>
                                <div className="listtaskmain4">
                                    <h2>{task.task_name}</h2>
                                </div>
                                <div className="listtaskmain5">
                                    <button onClick={()=>handleviewtask(task.id)}>View</button>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Userpage;
