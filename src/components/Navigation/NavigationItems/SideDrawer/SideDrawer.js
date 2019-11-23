import React from 'react';
import {NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems'
import './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const sideDrawer =(props)=>{
     let attachedClasses= "close";
     if (props.open){
        attachedClasses= "open";

     }

	return(
        <div >
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses}>
            <a href="/">Log Out</a>
                <nav >
                <ul className='NavigationItems'>
                <li className='NavigationItem'> <NavLink to="/dashboard">Inicio</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/niños">Niños</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/regalos">Regalos</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/usuarios">Usuarios</NavLink> </li>
            </ul>
                </nav>
            </div>
        </div>
    );
};


export default sideDrawer;