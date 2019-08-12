import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types' 

// Team Reducer Actions
export const getAllNBATeams = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_TEAMS' })
}

// Player Reducer Actions
export const getAllNBAPlayers = () => dispatch => {
    dispatch({ type: 'GET_ALL_NBA_PLAYERS' })
}

// User Reducer
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