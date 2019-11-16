import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import {withRouter} from "react-router";
import Niños from './components/Niños/nijos';
import {Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      
       <Switch>
           <Route path="/login" component={Login}/>
           <Layout>
           <Route path="/dashboard" component={Dashboard}/>
           <Route path="/niños" component={Niños}/>
           </Layout>
       </Switch>
       

          
    </div>

  );
}

export default withRouter(App);
