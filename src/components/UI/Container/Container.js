import React from 'react';
import './Container.css';
import NavigationItems from '../NavigationItems/NavigationItems'

const login=(props)=>(
    <div className="aDiv">
    <NavigationItems/>

    <div className="contain">
        
           {props.children}

    </div>
    </div>
    

);

export default login;