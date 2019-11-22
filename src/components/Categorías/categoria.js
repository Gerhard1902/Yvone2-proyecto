import React, {Component} from 'react';
import Regalo from '../../assets/regalo2.jpg';
import Image from '../Image2/Image';
import Card from '../Cards/Card';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import axios from '../../axios-petition';
import Spinner from '../UI/Spinner/Spinner';
import Pencil from "../../assets/pencil.jpg";
import X from "../../assets/x.png";
import "./categoria.css";

class Categoria extends Component{
    state={
        modalOpened:false,
        modalOpened:false,
        loading:false,
        error:false,
        completed:false,
        selectedPostId:null,
        posts:[]
        ,
            nombre: "",
    }
    componentDidMount(){
        axios.get('https://api-mongod.herokuapp.com/categorias')
         .then(response=>{
             this.setState({posts:response.data.result});
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
    submitHandler=()=>{
        alert("submitted");
		this.setState({modalOpened:false});
    }
    ContinueHandler=()=>{
    this.props.history.push({
        pathname:'/categorias',
    });
}
    render(){
        let x=(
            <div>
                
                <p className="niño">Nueva Categoría</p>
                <input placeholder="Nombre" className="data"></input>
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
            return <tr className="Atr">
                        <td className="aFlex Atd">{a.nombre} 
                            <div >
                                <img src={Pencil} className="icon" ></img> 
                                <img src={X} className="icon"></img>
                            </div>
                        </td>
                   </tr>
        });


        return(
            <div>
        <Image link={Regalo} text="Categorías" click={this.modalOpened} click2={this.ContinueHandler} button="Categorías"/>
        <div className="Aflex2">
            <table>
                <tr className="Atr">
                    <th className="Ath">Nombre </th>
                </tr>
                {posts}
            </table>
            
        </div>
        <Modal show={this.state.modalOpened} modalClosed={this.modalClosed}>
		    {x}
		</Modal>
    </div>
        );
    }
}



export default Categoria;