import React, {Component} from 'react';
import Regalo from '../../assets/bear.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import "./niños.css";
class Niño extends Component{
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

    render(){
        let x=(
            <div>
                <p className="niño">Agregar niño</p>
                <input placeholder="Nombre completo" className="data"></input>
                <input placeholder="Fecha de nacimiento" type="date" className="data"></input>
                <input placeholder="Calle" className="data"></input>
                <input placeholder="Número" className="data" type="number"></input>
                <input placeholder="Colonia" className="data"></input>
                <div className="col">
                    <div className="toggle">
                        <p className="textt">niño</p>
                        <label class="switch">
                            <input  type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">niña</p>
                    </div>
                    <div className="toggle">
                        <p className="textt">bueno</p>
                        <label class="switch">
                            <input  type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">malo</p>
                    </div>
                   
               </div>
               <div className="col">
                   <Button text="Cancelar"/>
                   <Button text="Aceptar"/>

               </div>
             
            </div>
        );


        return(
            <div>
                <Image link={Regalo} click={this.modalOpened} text="Lista de niños buenos y malos" />
                <Card imagen={Regalo}></Card>
                <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
				{x}
			</Modal>
            <button onClick={this.modalOpened}>ok</button>
            </div>
            
        );
    }
}

export default Niño;