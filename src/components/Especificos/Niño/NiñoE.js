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
        let st;
        if (this.loadedPost){
            if (this.loadedPost.genero== true){
                st="niño";
            }
            else st="niña"; 
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
                    <p>{this.state.loadedPost.nombre}</p>
                    <p>{st}</p>
                    <p>{this.state.loadedPost.calle}</p>
                    <p>{this.state.loadedPost.colonia}</p>
                    <p>{this.state.loadedPost.numero}</p>
                    <p>{v.getFullYear()-this.state.loadedPost.fechaNacimiento.substring(0,4)}</p>
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