import React from 'react';
import Home from '../home/home';
import User from '../user/user'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user' component={User} />
        </Switch>
      </main>
    )
  }
}
export default Main
