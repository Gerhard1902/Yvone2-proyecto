import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import {withRouter} from "react-router";
import Niños from './components/Niños/nijos';
import Usuarios from './components/Users/user';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Regalos from './components/Regalos/Regalo';

function App() {
  return (
    <div className="App">
      
       <Switch>
           <Route path="/login" component={Login}/>
           <Layout>
           <Route path="/dashboard" component={Dashboard}/>
           <Route path="/niños" component={Niños}/>
           <Route path="/regalos" component={Regalos}/>
           <Route path="/usuarios" component={Usuarios}/>
           </Layout>
       </Switch>
       

          
    </div>

  );
}

export default withRouter(App);
