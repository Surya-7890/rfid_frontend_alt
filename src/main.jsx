import React from 'react';
import ReactDOM from 'react-dom/client';
import StaffRegister from './StaffRegister';
import StudentRegister from './StudentRegister';
import Admin from './Admin';
import ViewStudentAttendance from './ViewStudentAttendance';
import SelectRegister from './SelectRegister';
import AdminInfo from './AdminInfo';
import './index.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/staffregister" element={<StaffRegister />} />
       <Route path="/studentregister" element={<StudentRegister />} />
       <Route path="/studentregister/home" element={<Home />} />
       <Route path="/admin" element={<Admin />} />
       <Route path="/selectregister" element={<SelectRegister />} />
       <Route path="/admin/getattendance" element={<ViewStudentAttendance />} />
       <Route path="/admininfo" element={<AdminInfo />} />
     </Routes>
  </BrowserRouter>
  </QueryClientProvider>
);