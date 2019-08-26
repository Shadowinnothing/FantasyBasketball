import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadUser, getAllNBAPlayers, getAllNBATeams, loadUsersLeagues } from './redux/actions/index'
import setAuthToken from './utils/setAuthToken';

import CreateLeaguePage from './components/CreateLeaguePage'
import Header from './components/Header'
import Home from './components/Home'
import LeaguesPage from './components/LeaguesPage'
import Login from './components/auth/Login'
import PlayerSearchBar from './components/PlayerSearchBar'
import SingleLeaguePage from './components/SingleLeaguePage'
import Register from './components/auth/Register'
import TeamPage from './components/TeamPage'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ({ userToken, loadUser, getAllNBAPlayers, getAllNBATeams, loadUsersLeagues }) => {

  // User, players, leagues, etc. load all the data related to the user
  useEffect(() => {
    loadUser()
    getAllNBAPlayers()
    getAllNBATeams()
  }, [])

  useEffect(() => {
    if(userToken !== undefined && userToken !== null)
      loadUsersLeagues({ userToken })
  }, [userToken])

  return (
    <BrowserRouter>
      <Header />
      <Route exact path='/' component={ Home } />
      <Route path="/playerSearch" component={ PlayerSearchBar }/>
      <Route path="/teams/:teamId/:teamName" component={ TeamPage } />
      <Route path="/register" component={ Register } />
      <Route path="/login" component={ Login } />
      <Route path="/createLeague" component={ CreateLeaguePage } />
      <Route path="/leagues" exact component={ LeaguesPage } />
      <Route path='/leagues/:id' component={ SingleLeaguePage } />
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return {
    userToken: state.Auth.token
  }
}

export default connect(mapStateToProps, { loadUser, getAllNBAPlayers, getAllNBATeams, loadUsersLeagues })(App)