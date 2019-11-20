import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import Santa from '../../assets/circle_santa-512.png';

class Login extends Component{

    constructor(props) {
      super(props);
      this.state = {
        user: '',
        password: '',
      };
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.ContinueHandler = this.ContinueHandler.bind(this);
    }


    handleUserChange(event) {
      this.setState({user: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }

    ContinueHandler(event){        

      axios.post('https://api-mongod.herokuapp.com/empleados/login', {
          nombre: this.state.user,
          password: this.state.password,
      }).then(res => {
        console.log(res);
        console.log(res.data.accessToken);
        window.open('/dashboard', "_self");
      })
      .catch((error) => {
        alert("Credenciales Incorrectas"); //Poner mensaje mas bonito
      })
    }


    render(){
        return(
            <div className="flex">
            <div className="center">

                <div className="transparency"></div>
            </div>

            <div className="okay">
                    <img src={Santa} className="santa"></img>
                    <input className="input1" placeholder="User" value={this.state.user} onChange={this.handleUserChange} />
                    <input className="input2" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <button className="btn-primary" onClick={this.ContinueHandler}>Submit</button>
                </div>
        </div>

        );
    }
}


export default Login;
