import React, {Component} from 'react';
import Regalo from '../../assets/santa.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

class Usuarios extends Component{
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
    render(){
        let x=(
            <div>
                
                <p className="niño">Agregar Usuario</p>
                <button class="dropbtn">Seleccionar foto de perfil</button>
                <input placeholder="Nombre Completo" className="data"></input>
                <input placeholder="Password" className="data"></input>
                <input placeholder="Confirmar Password" className="data"></input>
                <div className="col">
                   <Button text="Cancelar" clicked={this.modalClosed}/>
                   <Button text="Aceptar" clicked={this.submitHandler}/>

               </div>
            </div>
        );
        return(
            <div>
                <Image link={Regalo} click={this.modalOpened}  text="Lista de usuarios"/>
                <Card imagen={Regalo}></Card>
                <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
				    {x}
		    	</Modal>
           </div>
        );
    }
}
export default Usuarios;