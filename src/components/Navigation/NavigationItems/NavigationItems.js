import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {Link} from 'react-router-dom';

const navigationItems =(props)=>(

	<ul className='NavigationItems'>
        <NavigationItem link="/dashboard">Inicio</NavigationItem>
        <NavigationItem link="/niños">Niños</NavigationItem>
        <NavigationItem link="/regalos">Regalos</NavigationItem>
        <NavigationItem link="/usuarios">Usuarios</NavigationItem>
    </ul>

);


export default navigationItems;