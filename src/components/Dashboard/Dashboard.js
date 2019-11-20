import React from 'react';
import Cookies from 'universal-cookie';
import './Dashboard.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import ContadorDeTiempo from '../ContadorDeTiempo/ContadorDeTiempo';
import {withRouter} from "react-router";


const cookies = new Cookies();

const dashboard=(props)=>(
    <div>
        ¡Bienvenido, Snowman!
        <ContadorDeTiempo></ContadorDeTiempo>
    </div>


);
console.log(cookies.get('accessToken'));
export default withRouter(dashboard);
