import React, { Component } from 'react';
import axios from 'axios';
import Button from './../../UI/Button/Button';
import Image from './../../Image/Image';
import Card from './../../Cards/Card';
import { Link } from 'react-router-dom';
import './NiñoE.css';
import Pencil from '../../../assets/pencil.jpg';

class FullPost extends Component {
    state={
        status: this.props.status,
        loadedPost:null
    }
    
    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }

    componentDidMount(){
               
                axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
                .then(response=>{
                this.setState({loadedPost:response.data.nino}); 
                
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
        

        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
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
                                <p>{this.state.loadedPost.calle}</p>
                                <p>{this.state.loadedPost.colonia}</p>
                                <p>{this.state.loadedPost.numero}</p>
                                <Button text="Cambiar status" clicked={this.cambiarStatus}/>
                            </div>
                        </div>
                    </div>
                    <div className="regaloInfoE">
                        <div className="info">
                            <p>Regalos</p>
                            <p>Costo total: 38989.00 $</p>
                            <button className="addButton" onClick={this.addRegalo}>+</button>
                        </div>
                        <div className="regalosNE">
                            <Card></Card>
                            <Card></Card>
                        </div>
                    </div>
                    <div>
                        <Link to="/niños" className="link">
                            <Button text="< Regresar"/>
                        </Link> 
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;