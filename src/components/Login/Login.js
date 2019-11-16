import React from 'react';
import './Login.css';
import Santa from '../../assets/circle_santa-512.png';

const login=(props)=>(
    <div className="flex">
        <div className="center"> 
            <div className="ok">
                <img src={Santa} className="santa"></img> 
                <input className="input1" placeholder="User"/>
                <input className="input2" placeholder="Password"/>
                <button className="btn-primary">Submit</button>
            </div>
            <div className="transparency"></div> 
        </div>
           

    </div>
    

);

export default login;