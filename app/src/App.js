import React from 'react';
import ReactAux from './hoc/ReactAux'
import { Route, Switch } from 'react-router-dom'
import LoginContainer from './containers/LoginContainer/LoginContainer';
import LogoutContainer from './containers/SignupContainer/SignupContainer';
import DashBoard from './components/Dashboard/DashBoard'

function App() {
  return (
    <ReactAux>
            <Switch>
               <Route path="/" exact component={LoginContainer} />
               <Route path="/dashboard" exact component={DashBoard} />
               <Route path="/signup" exact component={LogoutContainer}/>
            </Switch>
    </ReactAux>
  );
}

export default App;