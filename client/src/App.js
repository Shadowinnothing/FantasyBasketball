import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import ModeSelector from './components/ModeSelector'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Route exact path='/' component={ ModeSelector } />
        </BrowserRouter>
    )
  }
}

export default App