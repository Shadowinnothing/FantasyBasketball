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
    LOAD_USERS_LEAGUES
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
export const createNewLeague = ({ leagueName, leagueType, userToken }) => async dispatch => {
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
        return newLeague
    } catch(err) {
        return err
    }
}

// Fill the users leagueReducer with all of their leagueIds upon login
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