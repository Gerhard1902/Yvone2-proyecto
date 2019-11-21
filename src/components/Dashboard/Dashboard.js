import React from 'react';
//import Cookies from 'universal-cookie';
import './Dashboard.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import ContadorDeTiempo from '../ContadorDeTiempo/ContadorDeTiempo';
import {withRouter} from "react-router";

//const cookies = new Cookies();

const dashboard=(props)=>(
    <div className="dashContainer">
        <div className="welcomeMsj">
            <h1>¡Bienvenido, Snowman!</h1>
        </div>
        <ContadorDeTiempo></ContadorDeTiempo>
    </div>
);
//console.log(cookies.get('accessToken'));
export default withRouter(dashboard);
