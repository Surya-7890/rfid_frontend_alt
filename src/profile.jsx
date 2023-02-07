import React from "react";

export default function Profile({ props }){
    return(
        <div className='grid grid-cols-3'>
            <div className='col-span-1'></div>
            <div className='col-span-2'>{props.time}</div>
        </div>
    )
}