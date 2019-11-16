import React from 'react';
import './Image.css';

const image =(props)=>(
    <div>
        <div className="layout">
            <p>{props.text}</p>
            <button className="bbuton">{props.button}</button>
        </div>
        
        <img src={props.link}></img>
    </div>
	

);

export default image;