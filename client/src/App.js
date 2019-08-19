import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadUser, getAllNBAPlayers, getAllNBATeams } from './redux/actions/index'
import setAuthToken from './utils/setAuthToken';

import CreateLeaguePage from './components/CreateLeaguePage'
import Header from './components/Header'
import Home from './components/Home'
import LeaguesPage from './components/LeaguesPage'
import Login from './components/auth/Login'
import ModeSelector from './components/ModeSelector'
import PlayerSearchBar from './components/PlayerSearchBar'
import Register from './components/auth/Register'
import TeamPage from './components/TeamPage'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

class App extends Component {

  componentDidMount = () => {
    this.props.loadUser()
    this.props.getAllNBAPlayers()
    this.props.getAllNBATeams()
  }

  render = () => {
    return (
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={ Home } />
        <Route path="/playerSearch" component={ PlayerSearchBar }/>
        <Route path="/teams/:teamId/:teamName" component={ TeamPage } />
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ Login } />
        <Route path="/createLeague" component={ CreateLeaguePage } />
        <Route path="/leagues" component={ LeaguesPage } />
      </BrowserRouter>
    )
  }
}

export default connect(null, { loadUser, getAllNBAPlayers, getAllNBATeams })(App)