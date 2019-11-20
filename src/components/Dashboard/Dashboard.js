import React from 'react';
import './Dashboard.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import ContadorDeTiempo from '../ContadorDeTiempo/ContadorDeTiempo';
import {withRouter} from "react-router";


const dashboard=(props)=>(
    <div>
        ¡Bienvenido, Snowman!
        <ContadorDeTiempo></ContadorDeTiempo>
    </div>
    

);

export default withRouter(dashboard);