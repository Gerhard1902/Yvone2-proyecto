import React, {Component} from 'react';
import './Card.css';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';

class Card2 extends Component{
    state={
        status: this.props.status
    }

 


    render(){
        
        return(
        <div className= "container3">
            <img src={this.props.link.toString()} className="profilePic"></img>
            <div>
                 <p className="title2">{this.props.name}</p> 
            </div>
                       
            
        </div>
);
    }
}

export default Card2;
