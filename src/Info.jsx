import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Profile from "./Profile";

export default function Info(){

    const [data, setData] = React.useState([]);
    const target = window.location.pathname.split('/')[1];
    const id = window.location.pathname.split('/')[3];

    React.useEffect(()=>{
        async function getData(){
            const res = await axios.get(`https://rfidbackendsece.onrender.com/${target}/getinfo/${id}`);
            const data = await res.data;
            setData(data);
            console.log(data);
        }
        setInterval(()=>{
            getData();
        },2000)
    },[]);

    return(
        <div>
        <div>
        <div className='flex relative bg-slate-400 h-24'>
          <div className='bg-green-500 text-white absolute right-28 flex h-full'>
            <Link to="/studentregister" className='flex justify-center items-center hover:bg-green-400'><div className='flex align-middle text-xl px-5 cursor-pointer flex-col justify-center m-0'>Student Login</div></Link>
            <Link to="/staffregister" className='flex justify-center items-center hover:bg-green-400  '><div className='flex align-middle text-xl px-5 cursor-pointer flex-col justify-center m-0'>Staff Login</div></Link>
            <Link to="/admin" className='flex justify-center items-center bg-white text-green-500'><div className='flex align-middle text-xl px-5 cursor-pointer flex-col justify-center m-0'>Admin Login</div></Link>
          </div>
        </div>
        </div>
        <div>{data.map(element =>{
            return <Profile key={element._id} props={element} />
        })}</div>
        </div>
    )
}