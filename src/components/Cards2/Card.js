import React, {Component} from 'react';
import './Card.css';
import DotsOptions from '../UI/DotsOptions/DotsOptions';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import Modal from '../UI/Modal/Modal';

class Card2 extends Component{
    state={
        status: this.props.status,
        modalOpened:false,
        modalOpened2:false,
        editar:false,
        selectedPostId:"",

        nombre:"",
        costo:"",
        urlImagen:"",
        categoria:"",
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

    changeStatusHandler=()=>{
        const est = !this.state.status;
        console.log(est);
        console.log(this.props.id);
        axios.put('https://api-mongod.herokuapp.com/ninos/'+ this.props.id,  { status: est } )     //Hay que modificar la ruta para el servidor
            .then(response=>{
                    console.log(response);
                    window.location.reload(false);
            })
            .catch(e => console.log(e));
    }

    deleteHandler=()=>{
        axios.delete('https://api-mongod.herokuapp.com/ninos/'+this.props.id)
            .then(response=>{
                    console.log(response);
                    window.location.reload(false);
            })
            .catch(this.setState({loading:false, modalOpened2:false, error:true, completed:false}));
		    this.setState({modalOpened:false});
    }
    handleChange=(event)=>{
        this.setState({"nombre": event.target.value});
        console.log(this.state.nombre);

    }
    handleChange2=(event)=>{
        this.setState({"fechaNacimiento": event.target.value});
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
        this.setState({"status": event.target.checked});
        console.log(this.state.status);

    }
    handleChange7=(event)=>{
        this.setState({"genero": event.target.checked});
        console.log(this.state.genero);

    }
    editHandler=()=>{
        this.setState({modalOpened2:true});
        axios.get('https://api-mongod.herokuapp.com/ninos/'+this.props.id)
            .then(response=>{
                this.setState(
                    {
                        nombre:response.data.nino.nombre,
                        calle:response.data.nino.calle,
                        colonia:response.data.nino.colonia,
                        fechaNacimiento:response.data.nino.fechaNacimiento,
                        genero:response.data.nino.genero,
                        numero:response.data.nino.numero,
                        status:response.data.nino.status,

                    });
                    console.log(response);
            })
            .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
    }
    editClickedHandler=()=>{
        const objeto={
            nombre:this.state.nombre,
            calle:this.state.calle,
            colonia:this.state.colonia,
            fechaNacimiento:this.state.fechaNacimiento,
            genero:this.state.genero,
            numero:this.state.numero,
            status:this.state.status,
        }
        console.log(objeto);
        console.log("la petición");
        axios.put('https://api-mongod.herokuapp.com/ninos/'+this.props.id,objeto)
            .then(response=>{
                console.log(response.data);
                this.setState({modalOpened2:false});
                window.location.reload(false);
            })
            .catch(this.setState({modalOpened2:false, error:true}));
    }

    render(){
        let x=(
            <div className="btnOptions">
                <button className="botones" onClick={this.editHandler}>Editar</button>
                <button className="botones" onClick={this.deleteHandler}>Eliminar</button>
           </div>
        );
        let y;
        if (this.state.status){
            y="green";
        }else{
            y="red"
        }
        let o=this.props.fechaNacimiento.substring(0,4);
        let v=new Date();

        return(
        <div className="container4">
            <div className={y}>
        </div>
        <div className="theRest2">
            <p className="title">{this.props.name}</p>
            <p className="texts">{this.props.calle} {this.props.numero} {this.props.colonia}</p>
            <p className="texts">{v.getFullYear()-o} años</p>
            <div className="margin">
            <Button text="Ver" clicked={this.props.c2}></Button>
            <Button text="Cambiar status" clicked={this.changeStatusHandler}></Button>
            </div>


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
            <p className="niño">Modificar Niño</p>
            <div>
                <div>Nombre</div>
                <input placeholder={this.state.nombre} className="data" onChange={this.handleChange}></input>
            </div>
                <input value={this.state.fechaNacimiento} type="date"
                     className="data" onChange={this.handleChange2}></input>
                <input placeholder={this.state.calle} className="data" onChange={this.handleChange3}></input>
                <input placeholder={this.state.numero} className="data" type="number" onChange={this.handleChange4}></input>
                <input placeholder={this.state.colonia} className="data" onChange={this.handleChange5}></input>
                <div className="col">
                    <div className="toggle">
                        <p className="textt">niño</p>
                        <label class="switch">
                            <input  type="checkbox" value={this.state.genero} onChange={this.handleChange6}></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">niña</p>
                    </div>
                    <div className="toggle">
                        <p className="textt">bueno</p>
                        <label class="switch">
                            <input value={this.state.nombre} type="checkbox" onChange={this.handleChange7}></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">malo</p>
                    </div>
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

export default Card2;
