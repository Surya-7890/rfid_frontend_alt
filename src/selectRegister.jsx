import React from "react";
import { Link } from "react-router-dom";
export default function SelectRegister(){

    React.useEffect(()=>{
        const isRegistered = window.localStorage.getItem('token');
        if (!isRegistered) {
            window.location.pathname = "/signin";
        }
    },[]);

    return(
        <>
        <div className='bg-ylw h-screen w-screen mt-0'>
        <div className='pt-10 flex justify-center items-center'>
            <div className='bg-red-500 py-2 pr-2 pl-5  text-black font-semibold text-xl rounded-l-md'>You haven't registered yet ,</div>
            <div className='bg-red-500 py-2 text-black pr-5 font-semibold text-xl rounded-r-md'>please register yourself.</div>
        </div>
        <div className='flex mt-60 ml-[60px] justify-center items-center space-x-20'>
            <div>
                <img src="./user-graduate-solid.svg" className='m-2 h-24' />
                <Link to="/studentregister"><div className='h-16 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-24 bg-green-500 flex justify-center items-center text-white rounded-xl'>Student</div></Link>
            </div>
            <div>
                <img src="./user-tie-solid.svg" className='m-2 h-24' />
                <Link to="/staffregister"><div className='h-16 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-24 bg-green-500 flex justify-center items-center text-white rounded-xl'>Staff</div></Link>
            </div>
            <div>
                <img src="./user-gear-solid.svg" className='h-24 m-2' />
                <Link to="/admin"><div className='h-16 shadow-xl hover:bg-green-400 hover:-translate-y-1 cursor-pointer w-24 bg-green-500 flex justify-center items-center text-white rounded-xl'>Admin</div></Link>
            </div>
        </div>
        </div>
        </>
    )
}