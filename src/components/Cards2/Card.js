import React, {Component} from 'react';
import './Card.css';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';

class Card2 extends Component{
    state={
        status: this.props.status
    }

    changeStatusHandler=()=>{
        // this.setState({status:!this.state.status});
        // const niño = {
        //   status:this.state.status
        // }
        const est = !this.props.status;        
        axios.put('https://api-mongod.herokuapp.com/ninos/'+ this.props.id,  { status: est } )     //Hay que modificar la ruta para el servidor
            .then(r => console.log(r.status))
            .catch(e => console.log(e));
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
            <Button text="Ver 2" clicked={this.props.c2}></Button>
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
