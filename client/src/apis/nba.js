import axios from 'axios'

import { XRapidAPIKey } from '../config/keys'

export default axios.create({
    baseURL: 'https://api-nba-v1.p.rapidapi.com',
    headers: {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": XRapidAPIKey
    }
})
