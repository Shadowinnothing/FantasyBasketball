import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>

      </div>
    )
  }
}

export default App
