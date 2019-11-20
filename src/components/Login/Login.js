import React, {Component} from 'react';
import './Login.css';
import Santa from '../../assets/circle_santa-512.png';

class Login extends Component{

    ContinueHandler=()=>{
        this.props.history.push({
            pathname:'/dashboard',
        });
    }
    render(){
        return(
            <div className="flex">
            <div className="center"> 
               
                <div className="transparency"></div> 
            </div>
               
            <div className="okay">
                    <img src={Santa} className="santa"></img> 
                    <input className="input1" placeholder="User"/>
                    <input className="input2" placeholder="Password"/>
                    <button className="btn-primary" onClick={this.ContinueHandler}>Submit</button>
                </div>
        </div>
        
        );
    }
}


export default Login;