import React, { useEffect } from "react";
import Table from "./table";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { CSVLink } from 'react-csv'

const fetchStudentAttendance = async({ queryKey })=>{
    const target = queryKey[1]
   const res = await axios.get(`https://rfidbackendsece.onrender.com/${target}/getattendance`);
   const data = await res.data; 
   console.log(data)
   return data;
}

const getStudentEntry = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/students/entry');
    const data = await res.data;
    return data;
}

const getStudentExit = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/students/exit');
    const data = await res.data;
    return data;
}

const getStafftEntry = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/staffs/entry');
    const data = await res.data;
    return data;
}

const getStaffExit = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/staffs/exit');
    const data = await res.data;
    return data;
}

export default function ViewStudentAttendance(){
    
    const [target, setTarget] = React.useState("students")
    const [csvStudent, setCsvStudent] = React.useState(null)
    const [csvStaff, setCsvStaff] = React.useState(null)

    useEffect(()=>{
        const downloadStudentData = async () => {
            const res = await axios.get('https://rfidbackendsece.onrender.com/downloadData/student');
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
        const res = await axios.get('https://rfidbackendsece.onrender.com/downloadData/staff');
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
    downloadStaffData();
    downloadStudentData();
},[])


    const student = useQuery( {
        queryKey:['attendance', target], 
        queryFn: fetchStudentAttendance,
        refetchInterval: 1500,
        refetchIntervalInBackground:true
    });



    const student_entry = useQuery( {
        queryKey:['studentEntry'], 
        queryFn: getStudentEntry,
        refetchInterval: 1500,
        refetchIntervalInBackground:true
    })

    const student_exit = useQuery( {
        queryKey:['studentExit'], 
        queryFn: getStudentExit,
        refetchInterval: 1500,
        refetchIntervalInBackground:true
    })

    const staff_entry = useQuery( {
        queryKey:['staffEntry'], 
        queryFn: getStafftEntry,
        refetchInterval: 1500,
        refetchIntervalInBackground:true
    })

    const staff_exit = useQuery( {
        queryKey:['staffExit'], 
        queryFn: getStaffExit,
        refetchInterval: 1500,
        refetchIntervalInBackground:true
    });

    function redirect(){
        window.location.pathname = "/admin";
    }

    if( student.isLoading ||staff_entry.isLoading || staff_exit.isLoading || student_entry.isLoading || student_exit.isLoading) {
        return <h2>Loading...</h2>
    }

    function adminInfo(){
        window.location.pathname="/admininfo"
    }    

    return(
        <div>
        <div>
        <div className='flex relative h-24 bg-yellow-bg items-center'>
            <div className='h-full flex items-center ml-24' onClick={adminInfo}><img src="/circle-user-regular.svg" className='h-[45%] cursor-pointer' /><div className='font-semibold text-xl ml-2 cursor-pointer'>Admin</div></div>
          <div className='bg-blue-bg text-white absolute right-0 md:right-28 flex px-5 py-2 cursor-pointer' onClick={redirect}>Log Out</div>
          <div><img src="/logout.svg" className='absolute right-[58px] top-[25px] h-[45%] cursor-pointer' onClick={redirect} /></div>
        </div>
      </div>
        <div className='h-screen overflow-hidden'>
            <div className='grid grid-cols-12 h-full'>


                <div className='col-span-2 h-full border-gray-400 bg-slate-200'>


                    <div onClick={()=>setTarget("students")} className='cursor-pointer' id='students' >
                        <div>
                            <div className='ml-8 mt-8'>
                            <div className='h-44 w-44 bg-green-500 rounded-full absolute flex justify-center items-center'><div className='h-36 w-36 bg-slate-200 rounded-full font-semibold text-3xl flex justify-center pt-5'>{Number(student_entry.data.message) - Number(student_exit.data.message)}</div></div>
                            <div className='relative top-28 left-[34px] px-4 bg-slate-200 rounded-t-full w-fit'>
                                <img src="/user-graduate-solid.svg" className='h-20 mb-3 fill-white text-white' />
                                { csvStudent && <CSVLink {...csvStudent} className='h-12 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-20 bg-green-500 flex justify-center items-center text-white rounded-xl absolute left-2'>Download</CSVLink>}
                            </div>
                            </div>
                        </div>
                    </div>`


                    <div onClick={()=>setTarget("staffs")} className='cursor-pointer' id='staffs'>
                        <div className='ml-8 mt-44'>
                            <div className='h-44 w-44 bg-green-500 rounded-full absolute flex justify-center items-center'><div className='h-36 w-36 bg-slate-200 rounded-full font-semibold text-3xl flex justify-center pt-5'>{Number(staff_entry.data.message) - Number(staff_exit.data.message)}</div></div>
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
                <div>{student.data.map(element => {
                    return <Table key={element._id} props={element} person={target} />
                })}</div>
                </div>
                </div>
        </div>
        </div>
    )
}
