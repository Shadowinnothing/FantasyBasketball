import axios from 'axios'

import { nbaRapidAPIKey } from '../keys'

export default axios.create({
    baseURL: 'https://api-nba-v1.p.rapidapi.com',
    headers: {
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        "X-RapidAPI-Key": nbaRapidAPIKey
    }
})
