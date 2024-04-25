import React, { useEffect, useState } from "react";
import './usertaskedit.css'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Usertaskedit({ match }) {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [taskdetails, setTaskdetails] = useState("");
    const [user1, setUser1] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [inputvalue, setInputvalue] = useState("");

    const token = Cookies.get('token');
    const decoded = jwtDecode(token);

    const handlecomments = () => {
    }

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleSaveComment = () => {
        const comment = {
            comments: inputvalue,
            task_id: taskdetails.id,
            user_id: decoded.user_id,
            user_name:decoded.username,
        };

        axios.post('http://127.0.0.1:8000/myapp1/postcomments', comment)
            .then(response => {
                console.log("comments posted", response.data);
                toast.success("Comment Added Successfully");
            })
            .catch(error => {
                console.log("error posting comments", error);
            });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp1/addtask/' + taskId)
            .then(response => {
                setTaskdetails(response.data);
                console.log("task", response.data)
            })
            .catch(error => {
                console.log("error", error);
            })
    }, [taskId]);

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

    return (
        <div className="tskdetailbox1">
                <div className="tskdetailbox11">
                        <input type="text" onChange={(e) => setInputvalue(e.target.value)}></input>
                        <button onClick={handleSaveComment}>Save</button>
                </div>
                <div className="tskdetailbox13">
                        <button>cancel</button>
                </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Usertaskedit;

