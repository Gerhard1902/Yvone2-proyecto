import React, {Component} from 'react';
import DotsOptions from '../UI/DotsOptions/DotsOptions';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import './Card.css';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            modalOpened:false,
            modalOpened2:false,
            editar:false,
            selectedPostId:"",

            nombre:"",
            costo:"",
            urlImagen:"",
            categoria:"",
            error:"",

            categ:[]
        }
    }

    componentDidMount(){
         axios.get('https://api-mongod.herokuapp.com/categorias/'+this.props.categoria)
          .then(response=>{
              this.setState({categ:response.data.categoria});
              console.log();
          })
          .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
     }

    modalOpened2=()=>{
        if (this.state.modalOpened === true){
            this.setState({modalOpened2:false});
        } else {
            this.setState({modalOpened2:true});
        }
	}
	modalClosed2=()=>{
        this.setState({modalOpened2:false});
    }


    modalOpened=()=>{
        if (this.state.modalOpened === true){
            this.setState({modalOpened:false});
        } else {
            this.setState({modalOpened:true});
        }
	}
	modalClosed=()=>{
        this.setState({modalOpened:false});
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

    deleteRegalo=()=>{
        axios.delete('https://api-mongod.herokuapp.com/regalos/'+this.props.id)
            .then(response=>{
                    console.log(response);
                    window.location.reload(false);
            })
            .catch(this.setState({loading:false, modalOpened2:false, error:true, completed:false}));
		    this.setState({modalOpened:false});
    }
    editarRegalo=()=>{
        this.setState({modalOpened2:true});
        axios.get('https://api-mongod.herokuapp.com/regalos/'+this.props.id)
            .then(response=>{
               this.setState(
                    {
                        nombre:response.data.regalo.nombre,
                        costo:response.data.regalo.costo,
                        urlImagen:response.data.regalo.urlImagen,
                        categoria:response.data.regalo.categoria,
                    });
                    console.log(response);
            })
            .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));

        /*this.props.history.push({
            pathname:'/categorias',
        });*/
    }
    editClickedHandler=()=>{
        const objeto={
            nombre:this.state.nombre,
            costo:this.state.costo,
            urlImagen:this.state.urlImagen,
            categoria:this.state.categoria,
        }
        console.log(objeto);
        console.log("la petición");
        axios.put('https://api-mongod.herokuapp.com/regalos/'+this.props.id,  objeto )
            .then(response=>{

                this.setState({modalOpened2:false});
                window.location.reload(false);
            })
            .catch(this.setState({modalOpened2:false, error:true}));
    }
    render(){
        let x=(
            <div className="btnOptions">
                <button className="botones" onClick={this.editarRegalo}>Editar</button>
                <button className="botones" onClick={this.deleteRegalo}>Eliminar</button>
           </div>
        );
        return(
            <div className="container" onClick={this.props.clicked}>
                <img src={this.props.imagen} className="imag"></img>
                <div className="theRest">
                    <p className="title">{this.props.name}</p>
                    <p className="texts">{this.state.categ.nombre}</p>
                    <p className="texts">${this.props.precio}</p>
                </div>
                <div className="dots" onClick={this.modalOpened}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <DotsOptions show={this.state.modalOpened} modalClosed={this.modalClosed}>
		                {x}
		            </DotsOptions>
                </div>
        <Modal show={this.state.modalOpened2} modalClosed={this.modalClosed2}>
            <div>
            <p className="niño">Modificar Regalo</p>
                <div>
                    <div >Nombre:</div>
                    <input placeholder={this.state.nombre} className="data"  onChange={this.handleChange}></input>
                </div>
                <div>
                    <div>Categoría: </div>
                    <select placeholder="categoría" onChange={this.handleChange4}>
                        {this.props.lol.map((x) => <option value={x._id}>{x.nombre}</option>)}
                    </select>
                </div>
                <div>
                    <div>Precio: </div>
                    <input placeholder={this.state.costo} type="number"  className="data" onChange={this.handleChange2}></input>
                </div>
                <div>
                    <div>Url imagen:</div>
                    <input placeholder={this.state.urlImagen} className="data"  onChange={this.handleChange3}></input>
                </div>

                <div className="col">
                    <Button text="Cancelar" clicked={this.modalClosed}/>
                    <Button text="Aceptar" clicked={this.editClickedHandler}/>
                </div>
            </div>
		</Modal>
            </div>
        );
    }
}

export default Card;
