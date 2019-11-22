import React, {Component} from 'react';
import Regalo from '../../assets/santa.jpg';
import Image from '../Image2/Image';
import Card from '../CardUsuario/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';

class Usuarios extends Component{
    state={
        modalOpened:false,
        loading:false,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[]
        ,
            nombre: "",
            link:""
    }
    componentDidMount(){
        axios.get('https://api-mongod.herokuapp.com/empleados')
         .then(response=>{
             this.setState({posts:response.data.result}); 
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
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
        if (this.state.loading){
            x=<Spinner/>;
        }
        const posts= this.state.posts.map(a=>{
            return <Card link={a.fotoPerfil} 
                    name={a.nombre}
        />});
        return(
            <div>
                <Image link={Regalo} click={this.modalOpened}  text="Lista de usuarios"/>
                <div className="otro">
                    {posts}
                </div>
                <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
				    {x}
		    	</Modal>
           </div>
        );
    }
}
export default Usuarios;