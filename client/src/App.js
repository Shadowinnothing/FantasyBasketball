import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import ModeSelector from './components/ModeSelector'
import PlayerSearchBar from './components/PlayerSearchBar'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={ ModeSelector } />
          <Route path="/playerSearch" component={ PlayerSearchBar }/>
        </BrowserRouter>
    )
  }
}

export default App