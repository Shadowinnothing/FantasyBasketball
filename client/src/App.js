import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadUser, getAllNBAPlayers, getAllNBATeams, loadUsersLeagues, loadUsersFantasyTeams } from './redux/actions/index'
import setAuthToken from './utils/setAuthToken';

import CreateLeaguePage from './components/CreateLeaguePage'
import CreateTeamPage from './components/CreateTeamPage'
import Header from './components/Header'
import Home from './components/Home'
import LeaguesPage from './components/LeaguesPage'
import Login from './components/auth/Login'
import PlayerSearchBar from './components/PlayerSearchBar'
import SingleFantasyLeaguePage from './components/SingleFantasyTeamPage'
import SingleLeaguePage from './components/SingleLeaguePage'
import Register from './components/auth/Register'
import TeamPage from './components/TeamPage'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ({ userToken, loadUser, getAllNBAPlayers, getAllNBATeams, loadUsersLeagues, loadUsersFantasyTeams }) => {

  // User, players, leagues, etc. load all the data related to the user
  useEffect(() => {
    loadUser()
    getAllNBAPlayers()
    getAllNBATeams()
  }, [])

  useEffect(() => {
    if(userToken !== undefined && userToken !== null)
      loadUsersLeagues({ userToken })
      loadUsersFantasyTeams({ userToken })
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
      <Route path="/leagues/:leagueId" exact component={ SingleLeaguePage } />
      <Route path="/leagues/:leagueId/createTeam" exact component={ CreateTeamPage } />
      <Route path="/leagues/:leagueId/teams/:teamId" exact component={ SingleFantasyLeaguePage } />
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return {
    userToken: state.Auth.token
  }
}

export default connect(mapStateToProps, { 
  loadUser,
  getAllNBAPlayers,
  getAllNBATeams,
  loadUsersLeagues,
  loadUsersFantasyTeams
})(App)