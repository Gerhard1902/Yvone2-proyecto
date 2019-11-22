import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

class Regalo2 extends Component{
    state={
        modalOpened:false,
    }

    modalOpened=()=>{
        this.setState({modalOpened:true});
        console.log("reached");
	}
	modalClosed=()=>{
		this.setState({modalOpened:false});
    }
    submitHandler=()=>{
        alert("submitted");
		this.setState({modalOpened:false});
    }
    ContinueHandler=()=>{
    this.props.history.push({
        pathname:'/categorias',
    });
}
    render(){
        let x=(
            <div>
                
                <p className="niño">Agregar Regalo</p>
                <input placeholder="Nombre" className="data"></input>
                <select placeholder="categoría">
                    <option>ok</option>

                </select>
                <input placeholder="Precio" type="number" className="data"></input>
                <input placeholder="Url imagen" className="data"></input>
                <div className="col">
                   <Button text="Cancelar" clicked={this.modalClosed}/>
                   <Button text="Aceptar" clicked={this.submitHandler}/>

               </div>
            </div>
        );
        return(
            <div>
        <Image link={Regalo} text="Catálogo de regalos" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>
        <Card imagen={Regalo}></Card>
        <Card imagen={Regalo}></Card>
        <Card imagen={Regalo}></Card>
        <Card imagen={Regalo}></Card>
        <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
		    {x}
		</Modal>
    </div>
        );
    }
}



export default Regalo2;