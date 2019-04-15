const axios = require('axios')

const keys = require('./keys/NBAAPI')

console.log(`${keys.NBAAPIURL}/teams/teamId/10`)
console.log(keys.config)

axios.get(`${keys.NBAAPIURL}/teams/teamId/10`, keys.config)
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
