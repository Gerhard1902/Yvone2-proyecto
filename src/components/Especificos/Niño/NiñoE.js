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
        status: true,
        loadedPost:null,
        ninoRegalo:[],
        ninoEspecifico:[""]
    }

    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }



    componentDidMount(){

            axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
            .then(response=>{
              this.setState({loadedPost:response.data.nino});
              this.setState({status:response.data.nino.status})
            })
            .catch(e => console.log(e));

            axios.get("https://api-mongod.herokuapp.com/ninosregalos")
            .then(response=>{
              this.setState({ninoRegalo:response.data.result});
              console.log("array de los niños")
              console.log(this.state.ninoRegalo);
              const ninoEsp = response.data.result.filter( x => x.idNino === this.props.match.params.id )
              .map(function( obj ) {
                return obj.idRegalo;
              });

              this.setState({ninoEspecifico:ninoEsp});
            })
            .catch(e => console.log(e));


        }

      componentDidUpdate() {
        console.log("prueba");
        console.log(this.state.ninoEspecifico);
      }

    deletePostHandler=()=>{

        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }

    cambiarStatus=()=>{
      console.log(this.state.loadedPost.status);
      const est = !this.state.loadedPost.status;
      console.log(est);
      axios.put('https://api-mongod.herokuapp.com/ninos/'+ this.props.match.params.id,  { status: est } )     //Hay que modificar la ruta para el servidor
          .then(response=>{
                  console.log(response);
                  window.location.reload(false);
          })
          .catch(e => console.log(e));
    }

    editarNinoE=()=>{
        console.log("Voy a editar al niño");
    }

    addRegalo=()=>{
        console.log("Voy a agregar un regalo");
    }

    nombreRegalo=(x)=>{
      console.log("probando metodo id")
      console.log(x);
      let valor = "";
      axios.get("https://api-mongod.herokuapp.com/regalos/"+x)
      .then(response=>{
        console.log(response.data.regalo);
        valor = response.data.regalo.nombre;
        console.log("ahora el nombre");
        console.log(valor);
        return valor;

      })
      .catch(e => console.log(e));
      console.log(valor)


    }

    render () {

      console.log(this.props.match.params.id);
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
                            <ul>
                              {this.state.ninoEspecifico.map((x) => <li>{this.nombreRegalo(x)}</li>)}

                            </ul>
                            <p>Costo total: 98765.00 $</p>
                            <button className="addButton" onClick={this.addRegalo}>+</button>
                        </div>
                        <div className="regalosNE">
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
