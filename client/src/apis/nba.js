import axios from 'axios'

import { XRapidAPIKey } from '../config/keys'

export default axios.create({
    baseURL: 'https://api-nba-v1.p.rapidapi.com',
    headers: {
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        "X-RapidAPI-Key": XRapidAPIKey
    }
})
