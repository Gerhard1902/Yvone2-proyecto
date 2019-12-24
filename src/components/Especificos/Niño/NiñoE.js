import React, { Component } from 'react';
import axios from 'axios';
import Button from './../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import Image from './../../Image/Image';
import Card from './../../Cards/Card';
import { Link } from 'react-router-dom';
import './NiñoE.css';
import Pencil from '../../../assets/pencil.jpg';

class FullPost extends Component {
    state={
        status: this.props.status,
        loadedPost:null,
        modalOpened:false,
        everything:false, 
        regalos:[]
    }
    
    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }

    componentDidMount(){
               
                axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
                .then(response=>{
                this.setState({loadedPost:response.data.nino}); 
                
            });

            axios.get("https://api-mongod.herokuapp.com/ninosregalos/")
                .then(response=>{ 
                    this.setState({everything: response.data.result});
                    console.log(response.data.result);
            });
           
            
        }
    
    deletePostHandler=()=>{

        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }

    cambiarStatus=()=>{
        console.log("Voy a cambiar status del niño");
        this.setState({
            status: !this.state.status,
        })
    }
    modalOpened=()=>{
        this.setState({modalOpened:true});
	  }
  	modalClosed=()=>{
  		this.setState({modalOpened:false});
    }

    editarNinoE=()=>{
        console.log("Voy a editar al niño");
    }

    addRegalo=()=>{
        console.log("Voy a agregar un regalo");
    }

    render () {

        let y;
        if (this.state.status){
            y="bueno";
        }else{
            y="malo"
        }
        let st;
        if (this.loadedPost){
            if (this.loadedPost.genero === true){
                st="niño";
            }
            else st="niña"; 
        }
        
        let post = <p style={{textAlign:'center'}}>No hay información para mostrar</p>;
        let v=new Date();
        if (this.props.id){
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div>
                    
                    <div className="kid">
                        <div className={y}></div>
                        <div className="seccionesNinoE">
                            <div className="fila1">
                                <p>{this.state.loadedPost.nombre}</p>
                                <div className="EditBtn" onClick={this.editarNinoE}>
                                    <img src={Pencil} className="icon"></img>
                                </div>
                            </div>
                            <div className="fila2">
                                <p>{st}</p>
                                <p>{v.getFullYear()-this.state.loadedPost.fechaNacimiento.substring(0,4)} años</p>
                            </div>
                            <div className="fila3">
                                <p>Calle:{this.state.loadedPost.calle},</p>
                                <p>Col:{this.state.loadedPost.colonia}</p>
                                <p># {this.state.loadedPost.numero}</p>
                                <Button text="Cambiar status" clicked={this.cambiarStatus}/>
                            </div>
                        </div>
                    </div>
                    <div className="regaloInfoE">
                        <div className="info">
                            <p>Regalos</p>
                            <p>Costo total: 98765.00 $</p>
                            <button className="addButton" onClick={this.modalOpened}>+</button>
                        </div>
                        <div className="regalosNE">
                        </div>
                     
                        <div>
                        <Link to="/niños" className="link">
                            <Button text="< Regresar"/>
                        </Link> 
                    </div>
                    </div>
                    
                   
                    <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
				    <div>
                        Petition completed!
                    </div>
		    	    </Modal>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;