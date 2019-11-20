import React, {Component} from 'react';
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

class Niño extends Component{
    state={
        modalOpened:false,
        loading:false,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[{
            id:"5dd5a4abf4b0c800174ea64b",
            nombre: "Kevin Barrera",
            status:false,
            calle:"Felipe Ángeles",
            número:202,
            colonia: "Zempoala",
            genero: false,
            fechaNacimiento:"1997-10-27"
        },{
            id:"5dd5a525209a5b00171226a5",
            nombre: "Kevin Barrera",
            status:false,
            calle:"Felipe Ángeles",
            número:202,
            colonia: "Zempoala",
            genero: false,
            fechaNacimiento:"1997-10-27"
        },]
        
        ,
        niño:{
            nombre: "Kevin Barrera",
            status:false,
            calle:"Felipe Ángeles",
            número:202,
            colonia: "Zempoala",
            genero: false,
            fechaNacimiento:"1997-10-27"
        },
        
    }

    componentDidMount(){
       axios.get('https://api-mongod.herokuapp.com/ninos')
        .then(response=>{
            this.setState({posts:response.data.result});
            console.log(response.data);
            console.log("el estado");
            console.log(this.state.posts);
            console.log(this.state.posts.result);
            
        })
        .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));
        console.log(this.state.posts);
    }
    modalOpened=()=>{
        this.setState({modalOpened:true});
        console.log("reached");
	}
	modalClosed=()=>{
		this.setState({modalOpened:false});
    }

    modalClosed3=()=>{
		this.setState({completed:false});
    }
    submitHandler=()=>{
        this.setState({loading:true});
        const niño={
            nombre: "Kevin Barrera",
            status:false,
            calle:"Felipe Ángeles",
            número:202,
            colonia: "Zempoala",
            genero: false,
            fechaNacimiento:"1997-10-27"
        }
        axios.post('/ninos.json', niño)     //Hay que modificar la ruta para el servidor
            .then(this.setState({loading:false, modalOpened:false, completed:true}))
            .catch(this.setState({loading:false, modalOpened:false, error:true, completed:false}));        
    }
    postClickedHandler=(id)=>{
        alert(id);
    }

    render(){
        
        
        
        let x=(
            <div>
                <p className="niño">Agregar niño</p>
                <input placeholder="Nombre completo" className="data"></input>
                <input placeholder="Fecha de nacimiento" type="date" className="data"></input>
                <input placeholder="Calle" className="data"></input>
                <input placeholder="Número" className="data" type="number"></input>
                <input placeholder="Colonia" className="data"></input>
                <div className="col">
                    <div className="toggle">
                        <p className="textt">niño</p>
                        <label class="switch">
                            <input  type="checkbox"></input>
                            <span class="slider round"></span>
                        </label>
                        <p className="textt">niña</p>
                    </div>
                    <div className="toggle">
                        <p className="textt">bueno</p>
                        <label class="switch">
                            <input  type="checkbox"></input>
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
                         fechaNacimiento={a.fechaNacimiento} clicked2={()=>this.postClickedHandler("-Lu-kdwoBRXAt_KjEHF5") } //Debería ir post.id, está hard-coded, pero obtiene datos del backend
        />});   
        

        return(
            <div>
                <Image link={Regalo} click={this.modalOpened} text="Lista de niños buenos y malos" />
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