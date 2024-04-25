import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register';
import Userpage from './pages/userpage';
import Adminpage from './pages/adminpage';
import Createtask from './pages/createtask';
import Listtask from './pages/listtask';
import Taskdetails from './pages/taskdetails';
import Edittask from './pages/edittask';
import Usertaskpage from './pages/usertaskpage';
import Usertaskedit from './pages/usertaskedit';



function App() {


  return (
    <div className='mainbody'>
        <div className='tskhead'>
          <h1>Task Management System</h1>
        </div>
      <Router>  
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/userpage' element={<Userpage/>} />
          <Route path='/adminpage' element={<Adminpage/>}/>
          <Route path='/createtask' element={<Createtask/>}/>
          <Route path='/listtask' element={<Listtask/>} />
          <Route path='/taskdetails/:taskId' element={<Taskdetails/>}/>
          <Route path='/edittask/:taskId' element={<Edittask/>}/>
          <Route path='/usertaskpage/:taskId' element={<Usertaskpage/>}/>
          <Route path='/usertaskedit/:taskId' element={<Usertaskedit/>}/>
          </Routes>
      </Router>  
    </div>
  )
}

export default App
