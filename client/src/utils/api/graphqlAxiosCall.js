// Hopefully someday I'll get this to work :(

import axios from 'axios'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

const graphqlAxiosCall = async graphqlQuery => {

    const query = jsonToGraphQLQuery(graphqlQuery)

    return await axios({
        url: '/graphql',
        method: 'get',
        data: {
            query: query, 
        }
    }).then(res => {
        console.log('GraphQL Call was a success')
        return res
    })
}

export default graphqlAxiosCall