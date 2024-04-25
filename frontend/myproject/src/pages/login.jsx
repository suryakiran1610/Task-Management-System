import React, { useState } from "react";
import './login.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { jwtDecode } from "jwt-decode";


function Login(){
    const[username,setUsername]=useState("")
    const[password,setPasssword]=useState("")
    const[error,setError]=useState("")

    const navigate=useNavigate()

    const data={
        "username":username,
        "password":password
    }

    const handlesubmit=((e)=>{
        e.preventDefault()
        if(!username || !password){
            toast.error("Username and Password Required")
        }
        else{
            axios.post('http://127.0.0.1:8000/myapp1/login/',data)
            .then((response)=>{
                if(response.data.error){
                    setError(response.data.error)
                    console.log(response.data.error)
                    toast.error(error)
                }
                else{
                    const token = response.data.token;
                    const decoded = jwtDecode(token);
                    if(decoded.superuser){
                        console.log("Admin login Successful")
                        Cookies.set("token",response.data.token,{ expires: 14 })
                        navigate('/adminpage')
                    }
                    else{
                        console.log("User login Successful")
                        Cookies.set("token",response.data.token,{ expires: 14 })
                        navigate('/userpage')
                    }    
                }
            })
            .catch((error)=>{
                console.log("error")
            })
        }    
    })

    return(
    <>
        <div className="card">
            <h2>Login</h2>
            <div className="login_register">
                <div className="login_register1">
                    <div className="login" target="blank">Login</div>   
                    <Link to="/register"><div className="register" target="blank">Register</div></Link>
                </div>
            </div>

            <form className="form" onSubmit={handlesubmit}>
                <input type="text" value={username} placeholder="username" className="email" onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" value={password} placeholder="password" className="pass" onChange={(e)=>setPasssword(e.target.value)}/>
                <button type="submit" className="login_btn">Login</button>

            </form>
            <div>
                <ToastContainer/>
            </div>
            
        </div>
     </>
    )
}
export default Login