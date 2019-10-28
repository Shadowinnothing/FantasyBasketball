import axios from 'axios'
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    GET_ALL_NBA_TEAMS,
    GET_ALL_NBA_PLAYERS,
    GET_NBA_TEAM,
    LOGOUT,
    CREATE_NEW_LEAGUE,
    CLEAR_LEAGUES,
    LOAD_USERS_LEAGUES,
    CREATE_NEW_FANTASY_TEAM,
    LOAD_USERS_FANTASY_TEAMS,
    LOAD_LEAGUE_MESSAGES,
    SEND_LEAGUE_MESSAGE,
    SIGN_NEW_CONTRACT
} from '../actions/types' 

import setAuthToken from '../../utils/setAuthToken'

// Team Reducer Actions
export const getAllNBATeams = () => dispatch => {
    dispatch({ type: GET_ALL_NBA_TEAMS })
}

export const getNBATeam = teamName => dispatch => {
    dispatch({ type: GET_NBA_TEAM, payload: teamName })
}

// Player Reducer Actions
export const getAllNBAPlayers = () => async dispatch => {
    try {
        const allPlayers = await axios.get('/stats/players/allPlayers')
        dispatch({ type: GET_ALL_NBA_PLAYERS, payload: allPlayers.data.players })
    } catch(err) {
        return err
    }
}

// Load a user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch(err) {
        dispatch({ type: AUTH_ERROR })
    }
}

// Register a user
export const register = ({ name, email, password, screenName }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password, screenName })

    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data })
        dispatch(loadUser())
    } catch(err) {
        const errors = err.response.data.errors
        if(errors){
            console.log( errors.forEach(error => error.msg) )
        }
        dispatch({ type: REGISTER_FAIL })
    }
}

// Login a user
export const login = (email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        dispatch(loadUser())

        // Load data into redux easier
        window.location.reload();
    } catch(err) {
        const errors = err.response.data.errors
        if(errors){
            console.log( errors.forEach(error => error.msg) )
        }
        dispatch({ type: LOGIN_FAIL })
    }
}

// Logout
export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_LEAGUES })

    // helps clear out the data stored in redux
    window.location.reload();
}

// Create a brand new fantasy basketball league
export const createNewLeague = ({ leagueName, leagueType, userToken, userId }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }
    const postBody = { leagueName, leagueType }

    try {
        const newLeague = await axios.post('/api/league/create', postBody, config)
        dispatch({ type: CREATE_NEW_LEAGUE, payload: newLeague })

        // create a team for the leagueManager
        await axios.post('/api/fantasyTeams/createTeam', {
            leagueId: newLeague.data.league._id,
            teamName: "DEFAULT NAME",
            teamOwner: userId,
            isManager: true
        }, config)

        // Grab all of the user's fantasyTeams after the new one has been created
        // There was a bug where a user did not appear to be a manager immedietaly after
        // creating a league. These two lines fix that issue
        const teams = await axios.get('/api/fantasyTeams/getAllUserTeams', config)
        dispatch({ type: LOAD_USERS_FANTASY_TEAMS, payload: teams.data.allTeams })
        
        return newLeague.data.league
    } catch(err) {
        return err
    }
}

// Fill the users leagueReducer with all of their leagues upon login
export const loadUsersLeagues = ({ userToken }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }

    try {
        const teams = await axios.get('/api/league/getAllUserLeagues', config)
        const _teams = teams.data.usersLeagues
        dispatch({ type: LOAD_USERS_LEAGUES, payload: _teams })
    } catch(err) {
        return err
    }
    
}

// Create a new Fantasy Team
export const createFantasyTeam = ({ teamName, leagueId, teamOwner, userToken, isManager }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }
    const postBody = { teamName, leagueId, teamOwner, isManager }
    try {
        const createdTeam = await axios.post('/api/fantasyTeams/createTeam', postBody, config)
        dispatch({ type: CREATE_NEW_FANTASY_TEAM, payload: createdTeam.data.newTeam })
        return createdTeam.data.newTeam
    } catch(err) {
        return err
    }
}

// Fill the users fantasyTeamReducer with all of their fantasy teams upon login
export const loadUsersFantasyTeams = ({ userToken }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }

    try {

        // get all fantasy teams data
        const teams = await axios.get('/api/fantasyTeams/getAllUserTeams', config)
        let allTeams = teams.data.allTeams

        // populate players/contracts for every team's roster
        allTeams = allTeams.map(async team => {
            let allEnabledContracts = await axios.get(`/api/contracts/enabledContracts/getAllByFantasyTeamId/${team._id}`, config)
            allEnabledContracts = allEnabledContracts.data.usersContracts
            team.players = allEnabledContracts
            
            return team
        })
        Promise.all(allTeams).then(res => dispatch({ type: LOAD_USERS_FANTASY_TEAMS, payload: res }))
    } catch(err) {
        return err
    }
}

// Fill fantasy league messages
export const loadLeagueMessages = ({ userToken, leagueId }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }

    try {
        const messages = await axios.get(`/api/league/getAllMessages/${leagueId}`, config)
        dispatch({ type: LOAD_LEAGUE_MESSAGES, payload: messages.data.allMessages })
        return messages.data.allMessages
    } catch(err) {
        return err
    }
}

// Send a message to the league
export const sendLeagueMessage = ({ userToken, messageText, leagueId, userName }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': userToken
        }
    }

    const postBody = { messageText, leagueId, userName }

    try {
        const newMessage = await axios.post(`/api/league/newMessage`, postBody, config)
        dispatch({ type: SEND_LEAGUE_MESSAGE, payload: newMessage.data })
    } catch(err) {
        return err
    }
}

// Sign a new contract to a player
export const signNewContract = contractObj => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'AuthToken': contractObj.userToken
        }
    }

    const postBody = { ...contractObj }

    try {
        await axios.post(`/api/contracts/sign`, postBody, config)
        //dispatch({ type: SIGN_NEW_CONTRACT, payload: res })
        //get all fantasy teams data
        const teams = await axios.get('/api/fantasyTeams/getAllUserTeams', config)
        let allTeams = teams.data.allTeams

        // populate players/contracts for every team's roster
        allTeams = allTeams.map(async team => {
            let allEnabledContracts = await axios.get(`/api/contracts/enabledContracts/getAllByFantasyTeamId/${team._id}`, config)
            allEnabledContracts = allEnabledContracts.data.usersContracts
            team.players = allEnabledContracts
            
            return team
        })
        Promise.all(allTeams).then(res => dispatch({ type: SIGN_NEW_CONTRACT, payload: res }))
    } catch(err) {
        return err
    }
}