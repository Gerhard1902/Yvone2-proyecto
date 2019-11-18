import React from 'react';
import './Image.css';
 

const image =(props)=>(

    <div >
    <div className="column">
        <div className="layout">
            <p className="text">{props.text}</p>
            <div>
                <button className="bbuton">{props.button}</button>
                <button className="bbuton2" onClick={props.click}>+</button>
            </div>
        </div>
        <input className="ok input"></input>
    </div>
        <img src={props.link} className="imagen"></img>
        
    </div>
	

);

export default image;