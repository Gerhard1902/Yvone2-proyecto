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
        status: true,
        loadedPost:null,
        ninoRegalo:[],
        ninoEspecifico:[],
        indexx:0,
        posts:[],
        index:"",
        idid:"",
        costo:0,
    }

    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }


    changing=(event)=>{
        this.setState({index:event.target.value});

    }
    componentDidMount(){

                axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
                .then(response=>{
                this.setState({loadedPost:response.data.nino});

            });

            axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
            .then(response=>{
              this.setState({loadedPost:response.data.nino});
              this.setState({status:response.data.nino.status})
            })
            .catch(e => console.log(e));

            axios.get("https://api-mongod.herokuapp.com/ninosregalos")
            .then(response=>{
              this.setState({ninoRegalo:response.data.result, idid:response.data.result._id});
              console.log("array de los niños")
              console.log(this.state.ninoRegalo);
              const ninoEsp = response.data.result.filter( x => x.idNino === this.props.match.params.id )
              .map(function( obj ) {
                return obj.idRegalo;
              });

              this.setState({ninoEspecifico:ninoEsp});

            })
            .catch(e => console.log(e));

            axios.get('https://api-mongod.herokuapp.com/regalos')
         .then(response=>{
             this.setState({
                 posts:response.data.result,
            });
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));


        }

      componentDidUpdate() {
        console.log("prueba");
        console.log(this.state.ninoEspecifico);

      }

    meterCosto=()=>{
      if(this.state.ninoEspecifico){
        let cost = this.state.costo;
        console.log("HOLA");
        let vamos = this.state.ninoEspecifico.map(function( obj ) {
          axios.get("https://api-mongod.herokuapp.com/regalos/"+obj)
          .then(response=>{
            console.log("costo solo")
            console.log(response.data.regalo.costo);
            if(cost != 'undefined'){
              console.log("metiendo");
              cost += response.data.regalo.costo
              console.log(cost);
              document.getElementById("costoTotal").innerHTML = cost;
            }
          })
          .catch(e => console.log(e));
        });
        console.log("total");
        console.log(cost);
        document.getElementById("costoTotal").innerHTML = cost;
      }
    }

    deletePostHandler=()=>{

        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }

    sHandler=()=>{
        console.log(this.props.match.params.id+ " "+this.state.index)
        axios.post('https://api-mongod.herokuapp.com/ninosregalos',{idNino:this.props.match.params.id, idRegalo:this.state.index})
            .then((r) =>{
              alert("Registro Exitoso");
              this.setState({loading:false, modalOpened:false, completed:true});
              window.location.reload(false)
            }
            )
            .catch(this.setState({modalOpened:false, error:true}));
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

    nombreRegalo=(x)=>{
      let valor = "";
      axios.get("https://api-mongod.herokuapp.com/regalos/"+x)
      .then(response=>{
        console.log(response.data.regalo);
        valor = response.data.regalo.nombre;
        console.log("ahora el nombre");
        console.log(valor);
        document.getElementById(this.state.indexx).innerHTML = valor;
        let v = this.state.indexx +1;
        this.setState({
          indexx: v
        });

      })
      .catch(e => console.log(e));
      console.log(valor)


    }

    render () {

        let op=this.state.posts.map(a=>{
            return <option value={a._id} >{a.nombre}</option>
        })

        const posts=
        <select onChange={this.changing}>
            {op}
        </select>;



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
                            <p></p>
                            <ul>
                              {this.state.ninoEspecifico.map((x,index) => <li id={index}>{this.nombreRegalo(x)}</li>)}

                            </ul>

                            <p id="costoTotal">$</p>
                            <button className="addButton" onClick={this.modalOpened}>+</button>
                            <button className="addButton" onClick={this.meterCosto}>$</button>
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
                    <p className="niño ko">Asociar un regalo</p>
                        <div className=" ko">Escoge un regalo:</div>
                        {posts}
                    </div>
                    <Button text="Cancelar" clicked={this.modalClosed}/>
                   <Button text="Aceptar" clicked={this.sHandler}/>
		    	    </Modal>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;
