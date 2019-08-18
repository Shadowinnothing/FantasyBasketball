import axios from 'axios'

const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['authToken'] = token
    } else {
        delete axios.defaults.headers.common['authtoken']
    }
}

export default setAuthToken