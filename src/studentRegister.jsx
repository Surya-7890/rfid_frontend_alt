import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StudentRegister(){

  const [id, setId] = useState(null);

    useEffect(()=>{
      const storageId = window.localStorage.getItem('id');
      setId(storageId);
    },[])

    async function handleSubmit(e){
        e.preventDefault()
        const name = document.getElementById('name').value;
        const dept = document.getElementById('dept').value;
        const roll = document.getElementById('roll').value;
        const year = document.getElementById('year').value;
        const res = await axios.post('https://rfidbackendsece.onrender.com/students',{ name, dept, roll, year, id });
        const data = await res.data;
        if (data.message === "Success") {
          window.localStorage.removeItem('id');
          window.location.pathname = "/"
        }
    }

    return(
        <>
        <div>
          <div className='flex w-screen overflow-hidden'>
          <img src="/iot.jpg" className='bg-center bg-cover bg-no-repeat w-full absolute -top-0 h-screen' />
        </div>
        </div>
        <div className='absolute w-screen top-0'>
        <div className='flex relative h-24 bg-yellow-bg items-center'>
          <img src="./logo.png" className='ml-16 h-[75%]' /> 
          <div className='bg-blue-bg text-white absolute right-0 md:right-28 flex h-full'>
            <Link to="/studentregister" className='flex justify-center items-center font-semibold rounded-md shadow-black shadow-md bg-white text-blue-bg'><div className='flex align-middle text-xl px-5 cursor-pointer flex-col justify-center m-0 w-52 pl-8'>Student Register</div></Link>
            <Link to="/staffregister" className='flex justify-center items-center shadow-blue font-semibold bg-blue-bg hover:bg-blue-800 hover:rounded-md hover:shadow-xl'><div className='flex align-middle text-xl px-5 cursor-pointer flex-col justify-center m-0 font-sembold w-52 pl-12'>Staff Register</div></Link>
          </div>
        </div>
        <div className='flex justify-center mt-44'>
        <div className='w-82 h-96 flex justify-center text-xl rounded-lg border-solid border-1 border-black items-center p-4 bg-gray-500 bg-opacity-50 shadow-lg shadow-black'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center w-fit'>
                <input id="name" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2' type="text" placeholder="Name" name="name" autoComplete="off" required={true}/>
                <input id="year" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2 mt-2' type="text" placeholder="Year of Study" name="year" autoComplete="off" required={true}/>
                <input id="roll" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2 mt-2' type="text" placeholder="Roll no." name="roll" autoComplete="off" required={true}/>
                <input id="dept" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2 mt-2' type="text" placeholder="Department" name="dept" autoComplete="off" required={true}/>
                <div className='flex justify-center text-white'><button type="submit" className='bg-blue-bg w-fit px-5 py-2 mt-2 rounded-full hover:bg-blue-800'>Submit</button></div>
            </form>
        </div>
       </div>
      </div>
        </>
    )
}