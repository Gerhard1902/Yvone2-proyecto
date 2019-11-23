import React, {Component} from 'react';
import './Image.css';
 
class Image2 extends Component{
    render(){
        let moodNavidad;

        //10 am del 24 dic hasta 12 pm del 25
        let navidad= new Date;
        if ( navidad.getDate()==24 && navidad.getHours()>=10 && navidad.getMonth()==11){
            if ( navidad.getDate()==25 && navidad.getHours()<=23 && navidad.getMonth()==11){
                moodNavidad = (
                    <button className="bbuton2">+</button>
                );
            }
        }
        else {
            moodNavidad = (
                <button className="bbuton2" onClick={this.props.click}>+</button>
            );
        }
        return(
            <div >
                    <div className="column">
                        <div className="layout">
                            <p className="text">{this.props.text}</p>
                            <div>
                                {moodNavidad}
                            </div>
                        </div>
                    </div>
                    <img src={this.props.link} className="imagen"></img>
                    
                </div>
        );
    }
}

export default Image2;