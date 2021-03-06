import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import './Regalo.css';
import swal from 'sweetalert';
import { thisTypeAnnotation } from '@babel/types';

class Regalo2 extends Component{
    state={
        modalOpened:false,
        loading:true,
        error:false,
        completed:false,
        selectedPostId:null,
        empty: false,
        categ:[],
        posts:[],
            nombre:"",
            costo:"",
            urlImagen:"",
            categoria: "5dd6e5409acbd4001732e558",
        textBuscar:'',
        postsBackup:[],
    }
    componentDidMount(){
        this.setState({loading:true});
        axios.get('https://api-mongod.herokuapp.com/regalos')
         .then(response=>{
             try{
             this.setState({
                 posts:response.data.result,
                 postsBackup:response.data.result,
                 key: response.data.result.nombre,
                 loading:false
            });
            this.setState({loading:true});
        } 
        catch{(this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true}))}
         })
         .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true}));

         axios.get('https://api-mongod.herokuapp.com/categorias')
          .then(
             
            response=>{
                try{
              this.setState({categ:response.data.result, loading:false});
                }
                catch{
                this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true})}
          }
         
          )
          .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false, empty:true}));
          this.setState({loading:false});

     }

     submitHandler=()=>{
        this.setState({loading:true});
        const num = Number(this.state.numero);
        const reg = {
            nombre: this.state.nombre,
            costo:this.state.costo,
            urlImagen:this.state.urlImagen,
            categoria:this.state.categoria,
        };
        console.log(reg);
        axios.post('https://api-mongod.herokuapp.com/regalos',  reg )     //Hay que modificar la ruta para el servidor
            .then((r) =>{
              swal("Asignacion Exitosa","Niño tiene nuevo regalo", "success");
              this.setState({loading:false, modalOpened:false, completed:true});
              setTimeout(function () {
                  window.location.reload(false)
              }, 2500);
            }
            )
            .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
    }
     handleChange=(event)=>{
        this.setState({"nombre": event.target.value});
        console.log(this.state.nombre);

    }
    handleChange2=(event)=>{
        this.setState({"costo": event.target.value});
        console.log(event.target.value);

    }
    handleChange3=(event)=>{
        this.setState({"urlImagen": event.target.value});
        console.log(event.target.value);

    }
    handleChange4=(event)=>{
        this.setState({"categoria": event.target.value});
        console.log(this.state.categoria);

    }

    modalOpened=()=>{
        this.setState({modalOpened:true});
	}
	modalClosed=()=>{
		this.setState({modalOpened:false});
    }

    ContinueHandler=()=>{
    this.props.history.push({
        pathname:'/categorias',
    });
}
    postSelectedHandler=(id)=>{
        this.setState({selectedPostId:id});
        console.log(this.state.selectedPostId);
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
                <p className="niño">Agregar Regalo</p>
                <input placeholder="Nombre" className="data" onChange={this.handleChange}></input>
                <select placeholder="categoría" onChange={this.handleChange4}>
                    {this.state.categ.map((x) => <option value={x._id}>{x.nombre}</option>)}
                </select>
                <input placeholder="Precio" type="number" className="data" onChange={this.handleChange2}></input>
                <input placeholder="Url imagen" className="data" onChange={this.handleChange3}></input>
                <div className="col">
                   <Button text="Cancelar" clicked={this.modalClosed}/>
                   <Button text="Aceptar" clicked={this.submitHandler}/>
               </div>
            </div>
        );
        if (this.state.loading){
            x=<Spinner/>;
        }
        console.log(this.state.posts);
        const posts= this.state.posts.map(a=>{
            return <Card imagen={a.urlImagen} name={a.nombre}
                        precio={a.costo}
                        categoria={a.categoria}
                        handleChange= {this.handleChange}
                        handleChange2= {this.handleChange2}
                        handleChange3= {this.handleChange3}
                        lol={this.state.categ}
                        id={a._id}
        />});
        let u;
        if (this.state.posts==false){
            u=<div>No hay elementos</div>;
        }

        return(
            <div>
        <Image link={Regalo} text="Catálogo de regalos" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>
        
        <div>
            <input type="search" className="searchBar" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <div className="otro">
                 {posts}
               </div>
            <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
                {x}
            </Modal>
            </div>
            {u}
    </div>
        );
    }
}



export default withErrorHandler(Regalo2, axios);
