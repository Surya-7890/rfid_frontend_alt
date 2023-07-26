import React, { useEffect } from "react";
import Table from "./table";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { CSVLink } from 'react-csv';
import io from 'socket.io-client';

const socket = io('https://rfidbackendsece.onrender.com');

const fetchAttendance = async({ queryKey })=>{
    const target = queryKey[1];
   const res = await axios.get(`https://rfidbackendsece.onrender.com/${target}/getattendance`);
   const data = await res.data; 
   console.log(data);
   return data;
}   

export default function ViewStudentAttendance(){
    
    const [target, setTarget] = React.useState("students")
    const [csvStudent, setCsvStudent] = React.useState(null)
    const [csvStaff, setCsvStaff] = React.useState(null)
    const [studentCount, setStudentCount] = React.useState(0);
    const [staffCount, setStaffCount] = React.useState(0);

    const downloadStudentData = async () => {
        const res = await axios.get('https://rfidbackendsece.onrender.com/students/downloadData');
        const data = await res.data;
        const headers = [
            { label: "Name", key: "name" },
            { label: "Roll No", key: "roll" },
            { label: "Status", key: "status" },
            { label: "Time", key: "time" }
        ];
    
        const csvLinkStudent = {
            filename: 'Student_Attendance.csv',
            headers,
            data
        }    
        setCsvStudent(csvLinkStudent);
    }
    const downloadStaffData = async () => {
        const res = await axios.get('https://rfidbackendsece.onrender.com/staffs/downloadData');
        const data = await res.data;
        console.log(data);
        const headers = [
            { label: "Name", key: "name" },
            { label: "Status", key: "status" },
            { label: "Time", key: "time" }
        ];

        const csvLinkStaff = {
            filename: 'Staff_Attendance.csv',
            headers,
            data
        }    
        setCsvStaff(csvLinkStaff);
    }

    
    const getStaffCount = async()=>{
        const res = await axios.get('https://rfidbackendsece.onrender.com/staffs/incount');
        const data = await res.data;
        const count = Number(data.message)
        console.log(count);
        setStaffCount(count);
    }
    
    const getStudentCount = async()=>{
        const res = await axios.get('https://rfidbackendsece.onrender.com/students/incount');
        const data = await res.data;
        const count = Number(data.message);
        console.log(count)
        setStudentCount(count);
    }    

    const fetchData = useQuery({
        queryKey: ['attendance', target],
        queryFn: fetchAttendance
    })

    useEffect(()=>{
        
        socket.on('studentEntry', (id)=>{
            console.log('student entry registered');
            getStudentCount();
            fetchData.refetch();
        });
        socket.on('studentExit', (id) => {
            console.log('student exit registered');
            getStudentCount();
            fetchData.refetch();
        });
        socket.on('staffEntry', (id)=>{
            console.log('staff entry registered');
            getStaffCount();
            fetchData.refetch();
        });
        socket.on('staffExit', (id) => {
            console.log('staff exit registered');
            getStaffCount();
            fetchData.refetch();
        });

        downloadStudentData();
        downloadStaffData();
        getStudentCount();
        getStaffCount();
    return () => {
        socket.off('studentEntry', (id)=>{
            console.log('student entry registered');
            fetchData.refetch();
        });
        socket.off('studentExit', (id) => {
            console.log('student exit registered');
            fetchData.refetch();
        });
        socket.off('staffEntry', (id)=>{
            console.log('staff entry registered');
            fetchData.refetch();
        });
        socket.off('staffExit', (id) => {
            console.log('staff exit registered');
            fetchData.refetch();
        });
        window.localStorage.removeItem('authToken');
    }
},[]);

    const staff = () => {
        setTarget("staffs");
    }

    const student = () => {
        setTarget("students");
    }

    function redirect(){
        window.location.pathname = "/admin";
    }

    function adminInfo(){
        window.location.pathname="/admininfo"
    }    

    return(
        <div>
        <div>
        <div className='flex relative h-24 bg-yellow-bg items-center'>
            <div className='h-full flex items-center ml-24' onClick={adminInfo}><img src="/user-tie-solid.svg" className='h-[45%] cursor-pointer' /><div className='font-semibold text-xl ml-2 cursor-pointer'>Admin</div></div>
          <div className='bg-blue-bg text-white absolute right-0 md:right-28 flex px-5 py-2 cursor-pointer' onClick={redirect}>Log Out</div>
          
        </div>
      </div>
        <div className='h-screen overflow-hidden'>
            <div className='grid grid-cols-12 h-full'>
                <div className='col-span-2 h-full border-gray-400 bg-slate-200'>
                    <div onClick={student} className='cursor-pointer' id='students' >
                        <div>
                            <div className='ml-8 mt-8'>
                            <div className='h-44 w-44 bg-green-500 rounded-full absolute flex justify-center items-center'><div className='h-36 w-36 bg-slate-200 rounded-full font-semibold text-3xl flex justify-center pt-5'>{studentCount}</div></div>
                            <div className='relative top-28 left-[34px] px-4 bg-slate-200 rounded-t-full w-fit'>
                                <img src="/user-graduate-solid.svg" className='h-20 mb-3 fill-white text-white' />
                                { csvStudent && <CSVLink {...csvStudent} className='h-12 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-20 bg-green-500 flex justify-center items-center text-white rounded-xl absolute left-2'>Download</CSVLink>}
                            </div>
                            </div>
                        </div>
                    </div>`
                    <div onClick={staff} className='cursor-pointer' id='staffs'>
                        <div className='ml-8 mt-44'>
                            <div className='h-44 w-44 bg-green-500 rounded-full absolute flex justify-center items-center'><div className='h-36 w-36 bg-slate-200 rounded-full font-semibold text-3xl flex justify-center pt-5'>{staffCount}</div></div>
                            <div className='relative top-28 left-[34px] px-4 bg-slate-200 rounded-t-full w-fit'>
                                <img src="/user-tie-solid.svg" className='h-20 fill-white text-white flex flex-col justify-center items-center mb-3' />
                                { csvStaff && <CSVLink {...csvStaff} className='h-12 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-20 bg-green-500 flex justify-center items-center text-white rounded-xl absolute left-2'>Download</CSVLink>}
                            </div>
                        </div>
                    </div>
                </div>
            <div className='col-span-10 h-screen mt-2 overflow-scroll'>
                <div className='flex justify-around space-x-3 text-black'>
                    <div className='bg-slate-300 w-full h-fit flex justify-center font-semibold text-xl'>Name</div>
                    {target === "students" &&<div className='bg-slate-300 w-full h-fit flex justify-center font-semibold text-xl'>Roll no.</div>}
                    <div className='bg-slate-300 w-full h-fit flex justify-center font-semibold text-xl'>Status</div>
                    <div className='bg-slate-300 w-full h-fit flex justify-center font-semibold text-xl'>Time</div>
                </div>
                <div>{ fetchData.data && fetchData.data.map(element => {
                    return <Table key={element._id} props={element} person={target} />
                })}</div>
                </div>
                </div>
        </div>
        </div>
    )
}
