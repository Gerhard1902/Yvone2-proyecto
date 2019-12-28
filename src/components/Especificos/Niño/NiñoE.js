import React, { Component } from 'react';
import axios from 'axios';
import Button from './../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import Equis from "../../../assets/x.png";
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
        filtered:[],

    }

    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }
    aleatorio=()=>{
        axios.get("https://api-mongod.herokuapp.com/regalos")
                .then(response=>{
                    console.log(response);
        console.log(response.data.result.length);
        axios.post('https://api-mongod.herokuapp.com/ninosregalos',{idNino:this.props.match.params.id, idRegalo:response.data.result[(Math.floor(Math.random() * (response.data.result.length+1)))]._id})
            .then((r) =>{
              this.setState({loading:false, modalOpened:false, completed:true});
              window.location.reload(false)
            }
            )
            .catch(this.setState({modalOpened:false, error:true}));
    }).catch(this.setState({modalOpened:false, error:true}));
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
                  console.log("el map");
                console.log(obj);
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
                  console.log(response.data.result);
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
              this.setState({loading:false, modalOpened:false, completed:true});
              window.location.reload(false)
            }
            )
            .catch(this.setState({modalOpened:false, error:true}));
    }

    cambiarStatus=()=>{
      const est = !this.state.status;
      this.setState({"status": !this.state.status});
      axios.put('https://api-mongod.herokuapp.com/ninos/'+ this.props.match.params.id,  { status: !this.state.status } )     //Hay que modificar la ruta para el servidor
          .then(r => console.log(r), )
          .catch(e => console.log(e));
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
    check=(x, id)=> {
        if (x===id && this.props.match.params.id)
            return true;
        else
            return false;
      }
    clickHandler=(id)=>{
        let ninoEsp="";
        axios.get("https://api-mongod.herokuapp.com/ninosregalos")
            .then(response=>{

                console.log("sdfsdf");
              console.log(response);
              ninoEsp = response.data.result.filter( x => x.idNino === this.props.match.params.id )
              //.filter( y => y.idRegalo === id ).map(function(g){return g._id})
              console.log("ese" +ninoEsp);
              console.log(ninoEsp);
              ninoEsp=ninoEsp.filter(x => x.idRegalo === id );
              console.log("el id ed"+ id);
              console.log(ninoEsp);
              axios.delete('https://api-mongod.herokuapp.com/ninosregalos/'+ ninoEsp[0]._id)
             .then(response=>{console.log(response);
                window.location.reload(false)
    });

    });
    console.log("fuera");
    console.log(ninoEsp);
 /*

    axios.delete('https://api-mongod.herokuapp.com/ninosregalos/'+ ninoEsp[0]._id)
    .then(response=>{console.log(response);
        window.location.reload(false)
    });*/
}

    nombreRegalo=(x)=>{
      let valor = "";
      axios.get("https://api-mongod.herokuapp.com/regalos/"+x)
      .then(response=>{
        valor = response.data.regalo.nombre;

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
        let relleno=
        <div className="jrp">
            <button className="addButton" onClick={this.modalOpened}>Agregar regalo</button>
            <button className="addButton" onClick={this.meterCosto}>Calcular costo</button>
            <p id="costoTotal">$</p>
            <button className="addButton" onClick={this.aleatorio}>Asignar aleatorio</button>
        </div>;
        

        console.log("viendo los posts " + this.state.posts);
        let carbon=this.state.posts.filter( x => x.nombre === "Carbon" )
        console.log(carbon);

        console.log(carbon.nombre);
        let op=this.state.posts.map(a=>{
            return <option value={a._id} >{a.nombre}</option>
        })

        let posts;


        let y;
        if (this.state.status){
            y="bueno";
            posts=
            <select onChange={this.changing}>
                {op}
            </select>;
        }else{
            y="malo";
            let g = carbon.map(a=>{

              return <option value={a._id} >{a.nombre}</option>
            })
            posts=
            <select onChange={this.changing}>
                <option value="0">Escoge categoria</option>
                {g}
            </select>;
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

        const regalos=this.state.ninoEspecifico.map((x,index) => {
            return <tr className="Atr" >
                       <td id={index} className="aFlex Atd hundred" >
                                <div>{this.nombreRegalo(x)}</div>
                        </td>
                        <td className=" Atd" onClick={()=>{this.clickHandler(x)}}>
                           <img src={Equis}   className="icon"></img>
                       </td>
                   </tr>
        });

        if (this.state.loadedPost){
            if ((v.getFullYear()-this.state.loadedPost.fechaNacimiento.substring(0,4))>=12){
                relleno=<div>Edad mayor a  11 años. No es posible agregar regalo</div>;
            }

            post = (
                <div className="otro2">

                    <div className="kid">
                        <div className={y}></div>
                        <div className="seccionesNinoE">
                            <div className="fila1">
                                <p>{this.state.loadedPost.nombre}</p>
                                <div className="EditBtn" onClick={this.editarNinoE}>
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
                        <div className="info2">
                        <div>
                            <table>
                                <tr className="Atr hundred">
                                    <th className="Ath">Lista de Regalos de {this.state.loadedPost.nombre} </th>
                                    <th className="Ath"> </th>
                                </tr>
                              {regalos}

                            </table>
                        </div>
                        {relleno}
                        </div>


                    </div>

                    <div>
                            <Link to="/niños" className="link">
                                <Button text="< Regresar"/>
                            </Link>
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
