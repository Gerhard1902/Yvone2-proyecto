import React, { Component } from 'react';
import axios from 'axios';
import './NiñoE.css';

class FullPost extends Component {
    state={
        status: true,
        loadedPost:null
    }
    
    changeStatusHandler=()=>{
        this.setState({status:!this.state.status});
    }

    componentDidMount(){
               
                axios.get("https://api-mongod.herokuapp.com/ninos/"+this.props.match.params.id)
                .then(response=>{
                this.setState({loadedPost:response.data.nino});  
            });
            
        }
    
    deletePostHandler=()=>{

        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }
    render () {
        let y;
        if (this.state.status){
            y="green";
        }else{
            y="red"
        }

        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        let v=new Date();
        if (this.props.id){
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="kid">
                    <div>
                         <div className={y}></div>
                    </div>
                    <h1>{this.state.loadedPost.nombre}</h1>
                    <h1>{this.state.loadedPost.calle}</h1>
                    <h1>{this.state.loadedPost.colonia}</h1>
                    <h1>{this.state.loadedPost.numero}</h1>
                    <h1>{v.getFullYear()-this.state.loadedPost.fechaNacimiento.substring(0,4)}</h1>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                    <div>x</div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;