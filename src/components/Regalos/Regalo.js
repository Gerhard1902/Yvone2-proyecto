import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';

class Regalo2 extends Component{
    state={
        modalOpened:false,
        loading:false,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[],
            nombre:"",
            costo:"",
            urlImagen:"",
            categoria:""
    }
    componentDidMount(){
        axios.get('https://api-mongod.herokuapp.com/regalos')
         .then(response=>{
             this.setState({posts:response.data.result});
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
     }

    modalOpened=()=>{
        this.setState({modalOpened:true});
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
        if (this.state.loading){
            x=<Spinner/>;
        }
        const posts= this.state.posts.map(a=>{
            return <Card imagen={a.urlImagen} name={a.nombre} 
                        precio={a.costo}
        />});

        return(
            <div>
        <Image link={Regalo} text="Catálogo de regalos" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>
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



export default Regalo2;