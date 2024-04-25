import React, { useEffect, useState } from "react";
import './taskdetailss.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Taskdetails({match}){
    const navigate=useNavigate();
    const navigatee=useNavigate();
    const{taskId}=useParams();
    const[taskdetails,setTaskdetails]=useState("");
    const [user1, setUser1] = useState([]);
    const[comment,setComment]=useState([]);
    const[toggle,setToggle]=useState(false);

    const handleedittask=()=>{
        navigate(`/edittask/${taskId}`);
    }
    const handlehome=()=>{
        navigatee('/adminpage');
    }
    const handlecomment=()=>{
            setToggle(!toggle);
    };


    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp1/addtask/'+taskId)
        .then(response=>{
            setTaskdetails(response.data);
            console.log("task",response.data);
        })
        .catch(error=>{
            console.log("error",error);
        })
    },[taskId]);


    useEffect(() => {
        if (taskdetails.task_members) {
            axios.get(`http://127.0.0.1:8000/myapp1/userfilterlist?user_id=${taskdetails.task_members}`)
                .then(response => {
                    setUser1(response.data);
                    console.log("user", response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [taskdetails.task_members]);

    useEffect(() => {
       if(taskdetails.id){ 
            axios.get(`http://127.0.0.1:8000/myapp1/commentfilter?task_id=${taskdetails.id}`)
                .then(response => {
                    setComment(response.data);
                    console.log("comment", response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }        
    }, [taskdetails.id]);
    

    return(
        <div className="tskdetailbox1">
            <div className="tskdetailbox2">
                <div className="tskdetailbox3">
                    <div className="tskdetailbox6">
                        <label>StartDate:</label>
                        <h3 className="taskdate1">{taskdetails.task_start}</h3>
                    </div>
                    <div className="tskdetailbox4">
                        <label>TaskName:</label>
                        <h3 className="taskdate2">{taskdetails.task_name}</h3>
                    </div>
                    <div className="tskdetailbox9">
                        <label>Status:</label>
                        <h3 className="taskdate2">{taskdetails.task_status}</h3>
                    </div>
                    <div className="tskdetailbox7">
                        <label>EndDate:</label>
                        <h3 className="taskdate1">{taskdetails.task_end}</h3>
                    </div>
                </div>
                <div className="tskdetailbox8">
                    <div className="tskdetailbox15">
                        <label>Assigned To:</label>
                    </div>
                    {user1.map(user=>(
                        <div className="tskdetailbox14" key={user.id}>
                            <h3 >{user.username}</h3>
                        </div>
                    ))}
                </div>
                <div className="tskdetailbox10">
                    <div className="tskdetailbox11">
                        <h4>{taskdetails.task_description}</h4>
                    </div>
                </div>
                {toggle &&
                    <div className="tskdetailbox16">
                        {comment.map(com=>(
                            <div className="tskdetailbox17" key={com.id}>
                                <label>{com.user_name}: </label>
                                <h4>{com.comments}</h4>
                            </div>
                        ))}    
                    </div>
                }
                <div className="tskdetailbox12">
                    <div className="tskdetailbox13">
                        <button onClick={()=>handleedittask()}>EDIT</button>
                        <button onClick={()=>handlehome()}>Home</button>
                        <button onClick={handlecomment}>Comments</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Taskdetails;