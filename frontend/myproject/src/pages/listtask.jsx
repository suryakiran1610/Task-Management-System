import React, { useState, useEffect } from "react";
import './listtask.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Listtask() {
    const [tasks, setTasks] = useState([]);
    const navigate=useNavigate()

    const handleviewtask=(taskId)=>{
        navigate(`/taskdetails/${taskId}`);
    }

    
    const handledeletetask=(taskId)=>{
        axios.delete('http://127.0.0.1:8000/myapp1/addtask/'+taskId)
        .then(response=>{
            console.log("task deleted",response.data)
            toast.error("Task Deleted");
            setTasks(tasks.filter(task=>task.id!==taskId));
        })
        .catch(error=>{
            console.log("error",error)
        })
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp1/addtask/')
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
                <div className="listtaskmain2">
                    {tasks.map(task => (
                            <div className="listtaskmain3" key={task.id}>
                                <div className="listtaskmain4">
                                    <h2>{task.task_name}</h2>
                                </div>
                                <div className="listtaskmain5">
                                    <button onClick={()=>handleviewtask(task.id)}>View</button>
                                    <button onClick={()=>handledeletetask(task.id)}>Delete</button>
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

export default Listtask;
