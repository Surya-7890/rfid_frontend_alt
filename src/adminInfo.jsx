import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminInfo(){

    async function handleSubmit(e){
        e.preventDefault()
        const new_password = document.getElementById('password').value;
        const password = document.getElementById('re_enter').value;
        if(new_password === password){
            const res = await axios.post('https://rfidbackendsece.onrender.com/admin/changepassword',{ password: new_password });
            const data = await res.data;
            console.log(data);
            if(data.message === "Success"){
                window.location.reload();
                window.location.pathname = "/admin";
            }
        } else {
            window.alert('OOPS... Looks like the re-entered password is incorrect')
        }
    }

    return(
        <>
        <div className='flex justify-center mt-52'>
        <div className='w-72 h-64 flex justify-center text-xl rounded-lg border-solid border-1 border-black items-center p-4 bg-gray-500 bg-opacity-50 shadow-lg shadow-black'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center w-fit'>
                <input id="password" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2' type="text" placeholder="New Password" name="name" autoComplete="off" required={true}/>
                <div>
                <input id="re_enter" className='px-5 py-3 rounded-lg focus:outline-0 focus:border-b-2 mt-2' type="text" placeholder="Re-Enter Password" name="password" autoComplete="off" required={true}/>
                <div></div>
                </div>
                <div className='flex justify-center text-white'><button type="submit" className='bg-blue-bg w-fit px-5 py-2 mt-2 rounded-full hover:bg-blue-800'>Submit</button></div>
            </form>
        </div>
       </div>
        </>
    )
}