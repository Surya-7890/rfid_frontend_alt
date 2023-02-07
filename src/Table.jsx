import React from "react";

export default function Table({ props, person }){
    let target; 
    (person === "students") ? target = "student" : target = "staff" ;

    function handleSubmit(e){
        window.location.pathname = `${target}/getinfo/${props.user_id}`
    }

    return(
        <div>
        {target === "student" &&
        <div className='grid grid-cols-4 h-fit border-b-2 text-xl text-black bg-white' onClick={handleSubmit}>
            <div className='col-span-1 flex justify-center h-20 items-center cursor-pointer border-r-2'>{props.name}</div>
            <div className='col-span-1 flex justify-center items-center cursor-pointer border-r-2'>{props.roll}</div>
            {props.status === "OUT" && <div className='col-span-1 flex justify-center items-center cursor-pointer text-2xl font-semibold text-red-400 border-r-2'>{/*<div><img src="/circle-xmark-regular.svg" className='h-8 relative left-20' /></div>*/}{props.status}</div>}
            {props.status === "IN" && <div className='col-span-1 flex justify-center items-center cursor-pointer text-2xl font-semibold text-green-400 border-r-2'>{/*<div><img src="/circle-check-regular.svg" className='h-8 relative left-20' /></div>*/}{props.status}</div>}
            <div className='col-span-1 flex justify-center items-center cursor-pointer'>{props.time}</div>
        </div>
        }
        {target === "staff" &&
        <div className='grid grid-cols-3 h-fit border-b-2 text-xl bg-white' onClick={handleSubmit}>
            <div className='col-span-1 flex justify-center h-20 items-center cursor-pointer border-r-2'>{props.name}</div>
            {props.status === "OUT" && <div className='col-span-1 flex justify-center items-center cursor-pointer text-2xl font-semibold text-red-400 border-r-2'>{props.status}</div>}
            {props.status === "IN" && <div className='col-span-1 flex justify-center items-center cursor-pointer text-2xl font-semibold text-green-400 border-r-2'>{props.status}</div>}
            <div className='col-span-1 flex justify-center items-center cursor-pointer'>{props.time}</div>
        </div>
        }
        </div>
    )
}