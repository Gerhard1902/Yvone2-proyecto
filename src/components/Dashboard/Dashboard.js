import React from 'react';
import './Dashboard.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import {withRouter} from "react-router";


const dashboard=(props)=>(
    <div>
        ¡Bienvenido, Snowman!
        <p>contador de tiempo</p>
    </div>
    

);

export default withRouter(dashboard);