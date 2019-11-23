import React from 'react';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToggle/DrawerToggle';




const toolbar=(props)=>(
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className='DesktopOnly'>
            <ul className='NavigationItems'>
                <li className='NavigationItem'> <NavLink to="/dashboard">Inicio</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/niños">Niños</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/regalos">Regalos</NavLink> </li>
                <li className='NavigationItem'> <NavLink to="/usuarios">Usuarios</NavLink> </li>
            </ul>

        </nav>

        <a href="/">Log Out</a>
    </header>
);

export default toolbar;
