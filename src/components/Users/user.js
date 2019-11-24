import React, {Component} from 'react';
import Regalo from '../../assets/santa.jpg';
import Image from '../Image2/Image';
import Card from '../CardUsuario/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import './user.css';
import swal from 'sweetalert';

class Usuarios extends Component{
    state={
        key:'',
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
            password2:"",
        textBuscar:'',
        postsBackup:[],
    }
    componentDidMount(){
        axios.get('https://api-mongod.herokuapp.com/empleados')
         .then(response=>{
             this.setState({
                posts:response.data.result,
                postsBackup:response.data.result,
                key: response.data.result.nombre
            });
            console.log(this.state.posts);
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
        console.log(reg);
        // if(this.state.password != this.state.password2){
        //   alert("Contraseñas no cuadran"); //Favor de dar formato que yo no se como hacerlo bonito jeje
        // }
        // else {
        //
        // }
        axios.post('https://api-mongod.herokuapp.com/empleados',  reg )     //Hay que modificar la ruta para el servidor
          .then((r) =>{
            swal("Registro exitoso","Nuevo usuario", "success");
            this.setState({loading:false, modalOpened:false, completed:true});
            setTimeout(function () {
                window.location.reload(false)
            }, 2500);
          }

          )
          .catch(
            this.setState({loading:false, modalOpened:false, error:true, completed:false}),
          );

    }


    modalOpened=()=>{
        this.setState({modalOpened:true});
        console.log("reached");
	}
	modalClosed=()=>{
		this.setState({modalOpened:false});
    }

    filter(event){
        console.log(event.target.value);
        //Obtine datos de la barra
        var text = event.target.value;
        //Obtiene datos de nuestros posts
        const data = this.state.postsBackup;

        const newData = data.filter(function(item){
            //Obtenemos el nombre del post
            const itemData = item.nombre.toUpperCase()
            //Obtenemos el texto de lo que buscamos
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            posts: newData,
            textBuscarext: text,
        })
    }

    render(){
        let x=(
            <div>

                <p className="niño">Agregar Usuario</p>
                <input type="text"  className="data"
                    placeholder="Url de foto de perfil"
                    onChange={this.handleChange2}></input>
                <input placeholder="Nombre Completo" className="data" onChange={this.handleChange}></input>
                <input type="password" placeholder="Password" className="data" onChange={this.handleChange3}></input>
                <input type="password" placeholder="Confirmar Password" className="data" onChange={this.handleChange} onChange={this.handleChange4}></input>
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
                <input type="search" className="searchBar" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
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
