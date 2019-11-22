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
        categ:[],
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

         axios.get('https://api-mongod.herokuapp.com/categorias')
          .then(response=>{
              this.setState({categ:response.data.result});
          })
          .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
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
        axios.post('https://api-mongod.herokuapp.com/regalos/',  reg )     //Hay que modificar la ruta para el servidor
            .then(res=>{
                this.setState({loading:false, modalOpened:false, completed:true})
                window.location.reload(false);git
            })
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
    submithandler=()=>{
        alert("submitted");
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

    render(){
        let x=(
            <div>
                <p className="niño">Agregar Regalo</p>
                <input placeholder="Nombre" className="data" onChange={this.handleChange}></input>
                <select placeholder="categoría" onChange={this.handleChange2}>
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
        const posts= this.state.posts.map(a=>{
            return <Card imagen={a.urlImagen} name={a.nombre}
                        precio={a.costo}
                        handleChange= {this.handleChange}
                        handleChange2= {this.handleChange2}
                        handleChange3= {this.handleChange3}
                        lol={this.state.categ}
                        id={a._id}
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
