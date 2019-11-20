import React, { Component } from 'react';
import axios from 'axios';
import './NiñoE.css';

class FullPost extends Component {
    state={
        id:"-Lu-kdwoBRXAt_KjEHF5",
        loadedPost:null
    }
    componentDidMount(){
        
                axios.get("https://christmas-api.firebaseio.com/ninos/-Lu-kdwoBRXAt_KjEHF5.json")
                .then(response=>{
                this.setState({loadedPost:response.data});
                console.log(response.data);
            });
            
        }
    
    deletePostHandler=()=>{
        axios.delete('/posts/'+ this.props.id)
        .then(response=>{console.log(response)});
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        let v=new Date();
        if (this.props.id){
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.nombre}</h1>
                    <h1>{this.state.loadedPost.calle}</h1>
                    <h1>{this.state.loadedPost.colonia}</h1>
                    <h1>{this.state.loadedPost.calle}</h1>
                    <h1>{v.getFullYear()-this.state.loadedPost.fechaNacimiento.substring(0,4)}</h1>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;