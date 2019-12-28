import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import Pencil from "../../assets/pencil.jpg";
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import { Link } from 'react-router-dom';
import X from "../../assets/x.png";
import "./categoria.css";
import swal from 'sweetalert';

class Categoria extends Component{
    state={
        modalOpened:false,
        modalOpened2:false,
        loading:true,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[]
        ,
            nombre: "",
            selectedPostId:""
    }
    componentDidMount(){
        this.setState({loading:true});
        axios.get('https://api-mongod.herokuapp.com/categorias')
         .then(response=>{
             try{
             this.setState({posts:response.data.result});
             this.setState({loading:true});
             }
             catch{
                this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true});
             }
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true}));
         this.setState({loading:false});
         console.log(this.state.posts);
     }

    modalOpened=()=>{
        this.setState({modalOpened:true});
        console.log("reached");
  	}

  	modalClosed=()=>{
  		this.setState({modalOpened:false});
      }

    submitHandler=()=>{
      axios.post('https://api-mongod.herokuapp.com/categorias/',  { nombre: this.state.nombre } )     //Hay que modificar la ruta para el servidor
          .then(r => {
            swal("Creacion exitosa","Nueva categoria", "success");
            this.setState({modalOpened:false, loading:true});
            setTimeout(function () {
                window.location.reload(false)
            }, 2500);
          })
          .catch(e => console.log(e));
    }

    handleChange=(event)=>{
       this.setState({"nombre": event.target.value});
       console.log(this.state.nombre);
    }

    ContinueHandler=()=>{
    this.props.history.push({
        pathname:'/categorias',
    });
}
    postSelectedHandler=(id, nombre)=>{
        this.setState({selectedPostId:id, nombre:nombre});
        console.log(this.state.nombre);
    }
    editHandler=()=>{
        this.setState({modalOpened2:true});

    }
    modalClosed2=()=>{
        this.setState({modalOpened2:false});
    }
    editClickedHandler=()=>{
        const objeto={
            nombre:this.state.nombre,
        }
        console.log(objeto);
        console.log("la petición");
        axios.put('https://api-mongod.herokuapp.com/categorias/'+this.state.selectedPostId, objeto)
            .then(response=>{
                console.log(response.data);
                this.setState({modalOpened2:false});
                window.location.reload(false);

            })
            .catch(this.setState({modalOpened2:false, error:true}));
    }
    deleteHandler=()=>{
        axios.delete('https://api-mongod.herokuapp.com/categorias/'+this.state.selectedPostId)
            .then(response=>{
                    console.log(response);
                    window.location.reload(false);
            })
            .catch(this.setState({loading:false, modalOpened2:false, error:true, completed:false}));
		this.setState({modalOpened:false});
    }

    render(){
        let x=(
            <div>

                <p className="niño">Nueva Categoría</p>
                <input placeholder="Nombre" className="data" onChange={this.handleChange}></input>
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
            return <tr className="Atr" onClick={()=>this.postSelectedHandler(a._id, a.nombre)}>
                        <td className="aFlex Atd">{a.nombre}
                            <div >
                                <img src={Pencil} className="icon" onClick={this.editHandler}></img>
                                <img src={X} className="icon" onClick={this.deleteHandler}></img>
                            </div>
                        </td>
                   </tr>
        });
        let u=<Spinner/>;
        if (this.state.empty){
            u=<div>No hay elementos</div>;
        }
        if (this.state.loading){
            u=(<div>
            <div className="Aflex2">
                <table>
                    <tr className="Atr">
                        <th className="Ath">Nombre </th>
                    </tr>
                    {posts}
                </table>
    
            </div>
            <div>
                <Link to="/regalos" className="link">
                    <Button text="< Regresar"/>
                </Link>
            </div>
            <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
                {x}
            </Modal>
            <Modal show={this.state.modalOpened2} modalClosed={this.modalClosed2}>
            <div>
                <p className="niño">Editar Categoría</p>
                <p>Nombre</p>
                <input placeholder={this.state.nombre} className="data" onChange={this.handleChange}></input>
                <div className="col">
                    <Button text="Cancelar" clicked={this.modalClosed2}/>
                    <Button text="Aceptar" clicked={this.editClickedHandler}/>
                </div>
            </div>
            </Modal>
            </div>);
        }


        return(
            <div>
                <Image link={Regalo} text="Categorías" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>

                {u}
            </div>
     
        );
    }
}



export default withErrorHandler(Categoria, axios);
