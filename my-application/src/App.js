import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Student from './Student';
import Admin from './Admin';
import AdminDashboard from './AdminDashboard';
import StudentData from './StudentData';
import Teacher from './Teacher';
import TeacherDashboard from './TeacherDashboard';
function App() { 
   let username="utkarsha";
  return (
     <BrowserRouter>
     <Routes>
         <Route path='/' element={<Welcome/>}></Route>
        
        
         <Route path='/Student' element={<Student/>}></Route>
         <Route path='/Admin' element={<Admin/>}></Route>
         <Route path='/Dashboard' element={<AdminDashboard/>}></Route>
         <Route path='/StudentData' element={<StudentData/>}></Route>
         <Route path='/Teacher' element={<Teacher/>}></Route>
         <Route path='/TeacherDashboard' element={<TeacherDashboard/>}></Route>
       </Routes>
     </BrowserRouter>
   
  );
 }




export default App;
