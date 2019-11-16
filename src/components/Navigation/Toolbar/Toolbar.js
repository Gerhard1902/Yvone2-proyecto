import React from 'react';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../NavigationItems/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>(
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className='DesktopOnly'>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;