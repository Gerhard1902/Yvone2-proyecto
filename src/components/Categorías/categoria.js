import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

class Categoria extends Component{
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
                
                <p className="niño">Nueva Categoría</p>
                <input placeholder="Nombre" className="data"></input>
                <div className="col">
                   <Button text="Cancelar" clicked={this.modalClosed}/>
                   <Button text="Aceptar" clicked={this.submitHandler}/>

               </div>
            </div>
        );
        return(
            <div>
        <Image link={Regalo} text="Categorías" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>
        <Card imagen={Regalo}></Card>
        <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
		    {x}
		</Modal>
    </div>
        );
    }
}



export default Categoria;