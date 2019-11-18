import React from 'react';
import './Card.css';

const card =(props)=>(
	<div className="container">
        <img src={props.imagen} className="imag"></img>
        <div className="theRest">
            <p className="title">Título</p>
            <p className="texts">Categoría</p>
            <p className="texts">Precio</p>     
        </div>
        <div className="dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        
    </div>

);

export default card;