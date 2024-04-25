import React, { useState } from "react";
import './register.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){

    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[error,setError]=useState("")
    const navigate=useNavigate()

    const data={
        "username":username,
        "password":password
    }

    const handlesubmit=(e)=>{
        e.preventDefault()
        if(!username || !password){
            toast.error("Username and Password Required")
        }
        else{
            axios.post('http://127.0.0.1:8000/myapp1/register/',data)
            .then((response)=>{
                if(response.data.error){
                    setError(response.data.error)
                    console.log(response.data)
                    toast.error(error)

                }
                else{
                    console.log("Registration successful:", response.data);
                    Cookies.set("token",response.data.token, { expires: 14 })
                    navigate('/login')
                }    

            })
            .catch((error)=>{
                console.log(error)
            })
        }    
    }

    return(
    <>
            <div className="card">
                <h2>Register</h2>
                <div className="login_register">
                    <div className="login_register1">
                        <Link to="/login"><div className="login" target="blank">Login</div></Link>
                        <div className="register" target="blank">Register</div>
                    </div>    
                </div>

                <form className="form" onSubmit={handlesubmit}>
                    <input type="text" value={username} placeholder="username" className="email" onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="password" value={password} placeholder="password" className="pass" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit" className="login_btn">Register</button>
                </form>
                <div>
                    <ToastContainer/>
                </div>

            </div>
     </>
    )
}
export default Register