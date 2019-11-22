import React, {Component} from 'react';
import DotsOptions from '../UI/DotsOptions/DotsOptions';
import './Card.css';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            modalOpened:false,
        }
    }

    modalOpened=()=>{
        if (this.state.modalOpened === true){
            this.setState({modalOpened:false});
        } else {
            this.setState({modalOpened:true});
        }
        console.log("Se está ejecutando el modalOpened");
	}
	modalClosed=()=>{
        this.setState({modalOpened:false});
        console.log("Se está ejecutando el modalClosed");
    }
    deleteRegalo=()=>{
        alert("Eliminado");
		this.setState({modalOpened:false});
    }
    editarRegalo=()=>{
        alert("Editado");
		this.setState({modalOpened:false});
        /*this.props.history.push({
            pathname:'/categorias',
        });*/
    }

    render(){
        let x=(
            <div className="btnOptions">
                <button className="botones" onClick={this.editarRegalo}>Editar</button>
                <button className="botones" onClick={this.deleteRegalo}>Eliminar</button>
           </div>
        );
        return(
            <div className="container">
                <img src={this.props.imagen} className="imag"></img>
                <div className="theRest">
                    <p className="title">{this.props.name}</p>
                    <p className="texts">Categoría</p>
                    <p className="texts">Precio</p>     
                </div>
                <div className="dots" onClick={this.modalOpened}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <DotsOptions show={this.state.modalOpened} modalClosed={this.modalClosed}>
		                {x}
		            </DotsOptions>
                </div>
            </div>
        );
    }
}
/*const card =(props)=>(
	<div className="container">
        <img src={props.imagen} className="imag"></img>
        <div className="theRest">
            <p className="title">{props.name}</p>
            <p className="texts">Categoría</p>
            <p className="texts">Precio</p>     
        </div>
        <div className="dots">
            <button className="btnDots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </button>
        </div>
    </div>
);*/

export default Card;