import React, {Component, useEffect } from 'react';
import Regalo from '../../assets/bear.jpg';
import Image from '../Image2/Image';
import Card from '../Cards2/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import NiñoE from '../Especificos/Niño/NiñoE';
import "./niños.css";
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import swal from 'sweetalert';

class Niño extends Component{
    state={
        modalOpened:false,
        loading:false,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[]
        ,
            nombre: "",
            status:false,
            calle:"",
            número:"",
            colonia: "",
            genero: false,
            fechaNacimiento:"",
        textBuscar:'',
        postsBackup:[],
        navidad:""
    };



    componentDidMount(){
       axios.get('https://api-mongod.herokuapp.com/ninos')
        .then(response=>{
            this.setState({
                posts:response.data.result,
                postsBackup:response.data.result,
                key: response.data.result.nombre
            });
            console.log(response.data);
            console.log("el estado");
            console.log(this.state.posts);
            console.log(this.state.posts.result);

        })
        .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
        console.log(this.state.posts);

    }

    asignarRegalo=()=>{

      if(this.state.idNin!=""){
        console.log("verificando")
        console.log(this.state.status);
        if(this.state.status === false){
          axios.post('https://api-mongod.herokuapp.com/ninosregalos/',{idNino:this.state.idNin, idRegalo:"5dda0db56107f70017ef2f32"})
            .then((r) =>{
              swal("Asignacion Exitosa","Niño tiene nuevo regalo", "success");
              this.setState({status: true});
              this.setState({loading:false, modalOpened:false, completed:true});
              setTimeout(function () {
                  window.location.reload(false)
              }, 2500);
            }
            )
            .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
        }
      }

    }
    modalOpened=()=>{
        this.setState({modalOpened:true});
	  }
  	modalClosed=()=>{
  		this.setState({modalOpened:false});
    }

    modalClosed3=()=>{
		this.setState({completed:false});
    }

    submitHandler=()=>{
        this.setState({loading:true});
        const num = Number(this.state.numero);
        console.log("de verdad es true? " +this.state.status)
        const niño = {
            nombre: this.state.nombre,
            status:this.state.status,
            calle:this.state.calle,
            numero:num,
            colonia: this.state.colonia,
            genero: this.state.genero,
            fechaNacimiento: this.state.fechaNacimiento
        };

        let año = niño.fechaNacimiento.substring(0,4);
        console.log(año)
        let v=new Date();
        let añoActual = v.getFullYear();
        let añoNiño = añoActual-año;
        console.log("edad es " + añoNiño);



        if(añoNiño <= 11 && añoNiño >= 2){
          console.log("Quiero el status"+niño.status);
          axios.post('https://api-mongod.herokuapp.com/ninos/',  niño )
          .then((r) =>{
            console.log(r.data.nino._id);
            console.log(r.data.nino.status);
            swal("Registro Exitoso","Niño ha sido registrado", "success");
            if(r.data.nino.status === true){
              console.log("pues hazlo");
              this.setState({loading:false, modalOpened:false, completed:true});
              setTimeout(function () {
                  window.location.reload(false)
              }, 2500);
            }


              console.log("HOLA");

                console.log("verificando")
                console.log(r.data.nino.status);
                if(r.data.nino.status === false){
                  axios.post('https://api-mongod.herokuapp.com/ninosregalos/',{idNino:r.data.nino._id, idRegalo:"5dda0db56107f70017ef2f32"})
                    .then((r) =>{
                      swal("Asignacion Exitosa","Niño tiene nuevo carbón", "success");

                      this.setState({loading:false, modalOpened:false, completed:true});
                      setTimeout(function () {
                          window.location.reload(false)
                      }, 2500);

                    }
                    )
                    .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
                }


          }
          )
          .catch((e)=>{
            swal("Error de Registro", "Niño no tiene la edad requerida", "error");
            this.setState({loading:false, modalOpened:false, error:true, completed:false});
          }

          );
        }
        else {
          alert("error en edad")
          swal("Error de Registro", "Niño no tiene la edad requerida", "error");
          window.location.reload(false)
        }
    }

    postModified=(id)=>{
        this.setState({selectedPostId:id});
        console.log(this.state.selectedPostId);
        this.props.history.push({
            pathname:'/niños/'+id,
        });
    }
    handleChange=(event)=>{
        this.setState({"nombre": event.target.value});
        console.log(this.state.nombre);

    }
    handleChange2=(event)=>{
        this.setState({fechaNacimiento: event.target.value});
        console.log(event.target.value);

    }
    handleChange3=(event)=>{
        this.setState({"calle": event.target.value});
        console.log(this.state.calle);

    }
    handleChange4=(event)=>{
        this.setState({"numero": event.target.value});
        console.log(this.state.numero);

    }
    handleChange5=(event)=>{
        this.setState({"colonia": event.target.value});
        console.log(this.state.colonia);

    }
    handleChange6=(event)=>{
        this.setState({"status": !event.target.checked});
        console.log("se cambio " + !event.target.checked);

    }
    handleChange7=(event)=>{
        this.setState({"genero": event.target.checked});
        console.log(this.state.genero);

    }
    deleteHandler=()=>{
       console.log("delete");
       /*deletePostHandler=()=>{
        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }*/
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
                <p className="niño">Agregar niño</p>
                <input placeholder="Nombre completo" className="data" onChange={this.handleChange}></input>
                <input placeholder="Fecha de nacimiento" type="date"
                     className="data" onChange={this.handleChange2}></input>
                <input placeholder="Calle" className="data" onChange={this.handleChange3}></input>
                <input placeholder="Número" className="data" type="number" onChange={this.handleChange4}></input>
                <input placeholder="Colonia" className="data" onChange={this.handleChange5}></input>
                <div className="col">
                    <div className="toggle">
                        <p className="textt">niño</p>
                        <label class="switch">
                            <input  type="checkbox" onChange={this.handleChange7}></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">niña</p>
                    </div>
                    <div className="toggle">
                        <p className="textt">bueno</p>
                        <label class="switch">
                            <input  type="checkbox" onChange={this.handleChange6}></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">malo</p>
                    </div>
               </div>
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
            return <Card imagen={Image} name={a.nombre} calle={a.calle}
                         numero={a.número} colonia={a.colonia}
                         fechaNacimiento={a.fechaNacimiento}
                         c2={()=>this.postModified(a._id)}
                         id={a._id}
                         status={a.status}
        />});


        return(
            <div>
                <Image link={Regalo} click={this.modalOpened} text="Lista de niños buenos y malos" />
                <input type="search" className="searchBar" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
                <div className="otro">
                    {posts}
                </div>

                <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
				    {x}
		    	</Modal>
                <Modal show={this.state.completed} modalClosed={this.modalClosed3}>
				    <div>
                        Petition completed!
                    </div>
		    	</Modal>
            </div>

        );
    }
}

export default withErrorHandler(Niño, axios);
