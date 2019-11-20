import React, {Component} from 'react';
import './Card.css';
import Button from '../UI/Button/Button';
class Card2 extends Component{
    state={
        status: true
    }
    
    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }
 
    render(){
        let y;
        if (this.state.status){
            y="green";
        }else{
            y="red"
        }
        let o=this.props.fechaNacimiento.substring(0,4);
        let v=new Date();
        
        return(<div className="container2">
        <div className={y}>

        </div>
        <div className="theRest2">
            <p className="title">{this.props.name}</p>
            <p className="texts">{this.props.calle} {this.props.numero} {this.props.colonia}</p>
            <p className="texts">{v.getFullYear()-o} años</p> 
            <div className="margin">
            <Button text="Ver" onClick={this.props.clicked2}></Button>
            <Button text="Cambiar status" clicked={this.changeStatusHandler}></Button>
            </div>
            

        </div>
        <div className="dots" >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        
    </div>
);
    }
}

export default Card2;