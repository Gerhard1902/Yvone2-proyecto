import React, {Component} from 'react';
import './Image.css';
 
class Image extends Component{
    render(){
        let moodNavidad;

        //10 am del 24 dic hasta 12 pm del 25
        let navidad= new Date;
        if ( navidad.getDate()==23 && navidad.getHours()>=10 && navidad.getMonth()==10){
            if ( navidad.getDate()==25 && navidad.getHours()<=23 && navidad.getMonth()==11){
                moodNavidad = (
                    <div>
                        <button className="bbuton">{this.props.button}</button>
                        <button className="bbuton2">+</button>
                    </div>
                );
            }
        }
        else {
            moodNavidad = (
                <div>
                    <button className="bbuton" onClick={this.props.click2}>{this.props.button}</button>
                    <button className="bbuton2" onClick={this.props.click}>+</button>
                </div>
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
/*const image =(props)=>(

    <div >
    <div className="column">
        <div className="layout">
            <p className="text">{props.text}</p>
            <div>
                <button className="bbuton" onClick={props.click2}>{props.button}</button>
                <button className="bbuton2" onClick={props.click}>+</button>
            </div>
        </div>
    </div>
        <img src={props.link} className="imagen"></img>
        
    </div>
	

);*/

export default Image;