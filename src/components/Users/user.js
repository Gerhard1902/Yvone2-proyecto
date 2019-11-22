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
            link:"",
            password: "",
            password2:""
    }
    componentDidMount(){
        axios.get('https://api-mongod.herokuapp.com/empleados')
         .then(response=>{
             this.setState({posts:response.data.result});
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
     }

    handleChange=(event)=>{
        this.setState({"nombre": event.target.value});
        console.log(this.state.nombre);

    }
    handleChange2=(event)=>{
        this.setState({"link": event.target.value});
        console.log(event.target.value);

    }
    handleChange3=(event)=>{
        this.setState({"password": event.target.value});
        console.log(this.state.nombre);

    }
    handleChange4=(event)=>{
        this.setState({"password2": event.target.value});
        console.log(event.target.value);

    }

    submitHandler=()=>{
        this.setState({loading:true});
        const num = Number(this.state.numero);
        const reg = {
            nombre: this.state.nombre,
            fotoPerfil:this.state.link,
            password:this.state.password,

        };
        if(this.state.password != this.state.password2){
          alert("Contraseñas no cuadran"); //Favor de dar formato que yo no se como hacerlo bonito jeje
        }
        else {
          axios.post('https://api-mongod.herokuapp.com/empleados/',  reg )     //Hay que modificar la ruta para el servidor
              .then(
                this.setState({loading:false, modalOpened:false, completed:true}),
                alert("Registro Exitoso")//Favor de dar formato que yo no se como hacerlo bonito jeje
              )
              .catch(
                this.setState({loading:false, modalOpened:false, error:true, completed:false}),
                alert("Registro Fallido")//Favor de dar formato que yo no se como hacerlo bonito jeje
              );
        }

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

                <p className="niño">Agregar Usuario</p>
                <input type="text"  className="data"
                    placeholder="Url de foto de perfil"
                    onChange={this.handleChange2}></input>
                <input placeholder="Nombre Completo" className="data" onChange={this.handleChange}></input>
                <input placeholder="Password" className="data" onChange={this.handleChange3}></input>
                <input placeholder="Confirmar Password" className="data" onChange={this.handleChange} onChange={this.handleChange4}></input>
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
