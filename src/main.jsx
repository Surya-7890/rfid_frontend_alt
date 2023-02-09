import React from 'react';
import ReactDOM from 'react-dom/client';
import StaffRegister from './staffRegister.jsx';
import StudentRegister from './studentRegister.jsx';
import Admin from './admin.jsx';
import ViewStudentAttendance from './viewStudentAttendance.jsx';
import SelectRegister from './selectRegister.jsx';
import './index.css';
import SignIn from './signIn.jsx';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/signin" element={<SignIn />} />
       <Route path="/staffregister" element={<StaffRegister />} />
       <Route path="/studentregister" element={<StudentRegister />} />
       <Route path="/studentregister/home" element={<Home />} />
       <Route path="/admin" element={<Admin />} />
       <Route path="/selectregister" element={<SelectRegister />} />
       <Route path="/admin/getattendance" element={<ViewStudentAttendance />} />
     </Routes>
  </BrowserRouter>
  </QueryClientProvider>
);