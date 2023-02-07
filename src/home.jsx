import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import io from "socket.io-client";

const socket = io('https://rfidbackendsece.onrender.com', { secure: true });

const getTotalEntry = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/gettotal/entry');
    const data = await res.data;
    console.log(data);
    return data;
}

const getTotalExit = async()=>{
    const res = await axios.get('https://rfidbackendsece.onrender.com/gettotal/exit');
    const data = await res.data;
    return data;
}

export default function Home(){


    React.useEffect(()=>{
        socket.on('connect', () => {
            console.log('connected');
        });
        socket.on('newId', (id) => {
            window.localStorage.setItem('id', id);
            window.location.pathname = "/selectregister";
        });
    },[]);

    const Entry = useQuery({
        queryKey: ['totalEntry'],
        queryFn: getTotalEntry,
        refetchInterval: 1000,
        refetchIntervalInBackground: true
    });

    const Exit = useQuery({
        queryKey: ['totalExit'],
        queryFn: getTotalExit,
        refetchInterval: 1000,
        refetchIntervalInBackground: true
    });

    if(Entry.isLoading || Exit.isLoading){
        return <h2>Loading...</h2>
    } 

    function redirect(){
        window.location.pathname = "/admin"
    }

    return(
        <>
        <div className='bg-ylw'>
        <div className='bg-slate-200 bg-opacity-30 absolute top-0 flex w-screen justify-center h-10 items-center text-xl'><div className='absolute right-[460px] font-bold text-'>MAKERSPACE DASHBOARD</div></div>
        <div className='relative'>
            <div className='md:h-screen md:w-1/4 md:bg-black hidden md:block'>
            <div className='w-1/4'>
            <div className='absolute top-[262px] left-20 text-white text-2xl rounded-md bg-red-600 p-3 mt-2 z-10'>Place Your Id card</div>
            <img src="./id-card.png" className='absolute left-16 top-80 h-64 mb-2 z-0' />
            </div>
            </div>

             <div className='bg-white'>
            <div className='absolute top-64 left-96 flex justify-around w-4/6 ml-8 h-max'>

                <div>
                <div className='h-56 w-56 bg-blue-500 rounded-full absolute flex justify-center items-center'><div className='h-44 w-44 bg-ylw rounded-full font-semibold text-3xl flex justify-center pt-5'>{Entry.data.message - Exit.data.message}</div></div>
                <div className='relative top-28 left-12 px-4 bg-ylw'>
                    <img src="/user-solid.svg" className='h-28 fill-white text-white' onClick={redirect} />
                </div>  
               <div className='relative text-white top-28 left-[72px] bg-blue-500 w-fit px-5 py-2 mt-2'>Count</div>
                </div>

                <div className='ml-8'>
                <div className='h-56 w-56 bg-green-500 rounded-full absolute flex justify-center items-center'><div className='h-44 w-44 bg-ylw rounded-full font-semibold text-3xl flex justify-center pt-5'>{Entry.data.message}</div></div>
                <div className='relative top-28 left-[26px] px-4 bg-ylw rounded-t-full'>
                    <img src="/user-plus-solid.svg" className='h-28 fill-white text-white' />
                </div>
               <div className='relative text-white top-28 left-[60px] bg-green-500 w-fit px-5 py-2 mt-2'> IN Count</div>
                </div>
                <div className='relative -left-3'>
                <div className='h-56 w-56 bg-red-500 rounded-full absolute flex justify-center items-center'><div className='h-44 w-44 bg-ylw rounded-full font-semibold text-3xl flex justify-center pt-5'>{Exit.data.message}</div></div>
                <div className='relative top-28 left-[28px] px-4 bg-ylw rounded-t-full'>
                    <img src="/user-minus-solid.svg" className='h-28 fill-white text-white' />
                </div>              
                <div className='relative text-white top-28 left-[60px] bg-red-500 w-fit px-5 py-2 mt-2'>OUT Count</div>
                </div>
            </div>
             </div>
        </div>
        </div>
        </>
    )
}