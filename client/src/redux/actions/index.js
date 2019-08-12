import axios from 'axios'
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/types' 

import setAuthToken from '../../utils/setAuthToken'

// Team Reducer Actions
export const getAllNBATeams = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_TEAMS' })
}

// Player Reducer Actions
export const getAllNBAPlayers = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_PLAYERS' })
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
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })

    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    } catch(err) {
        const errors = err.response.data.errors
        if(errors){
            console.log( errors.forEach(error => error.msg) )
        }
        dispatch({ type: REGISTER_FAIL })
    }
}