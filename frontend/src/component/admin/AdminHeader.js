import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css'

function AdminHeader(){
    const navigate = useNavigate();
    return(
        <>
       
        <nav className='adminHeader'>
        <div className='look'>
            <button onClick={(event) => {
                navigate("/home")
            }}>Home</button>


            <button className='buttonlog' onClick={(event) => {
                navigate("/login")
            }}>Logout</button>
           </div> 
        </nav>
    
        </>
    );
};

export default AdminHeader;