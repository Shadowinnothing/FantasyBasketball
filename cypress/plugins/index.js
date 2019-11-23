// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const axios = require('axios')

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('task', {
        'clear:testUsers': async () => {

            // login as haig to grab auth token for delete route
            const user = await axios.post('http://localhost:4000/api/auth', {
                email: 'haigryan@gmail.com',
                password: 'password'
            })

            // delete all test users
            axios.delete('http://localhost:4000/api/users/clearAllTestUsers', {
                headers: {
                    authToken: user.data.token
                }
            })

            return 'All Test Users Deleted'
        }
    })
}
