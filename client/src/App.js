import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import ModeSelector from './components/ModeSelector'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={ ModeSelector } />
        </BrowserRouter>
    )
  }
}

export default App