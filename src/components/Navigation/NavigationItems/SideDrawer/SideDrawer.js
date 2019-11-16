import React from 'react';

import NavigationItems from '../NavigationItems'
import './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const sideDrawer =(props)=>{
     let attachedClasses= "close";
     if (props.open){
        attachedClasses= "open";

     }

	return(
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses}>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </div>
    );
};


export default sideDrawer;