import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import {withRouter} from "react-router";
import Niños from './components/Niños/nijos';
import Usuarios from './components/Users/user';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NiñoE from './components/Especificos/Niño/NiñoE';
import Regalos from './components/Regalos/Regalo';
import Categoria from './components/Categorías/categoria';

function App() {
  return (
    <div className="App">
      
       <Switch>
           <Route path="/" exact component={Login}/>
           <Layout>
           <Route path="/dashboard" component={Dashboard}/>
           <Route path="/niños" exact component={Niños}/>
           <Route path="/niños/:id" exact component={NiñoE}/>
           <Route path="/regalos" component={Regalos}/>
           <Route path="/usuarios" component={Usuarios}/>
           <Route path="/categorias" component={Categoria}/>
           </Layout>
       </Switch>
       

          
    </div>

  );
}

export default withRouter(App);
