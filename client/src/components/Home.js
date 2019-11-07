import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = props => {

    const [ data, setData ] = useState()

    const graphql = async () => {
        await axios({
            url: '/graphql',
            method: 'post',
            data: {
                query: `
                    { dreesen }
                `
            }
        }).then(res => {
            console.log('made it')
            setData(res.data.data)
        })
    }

    useEffect(() => {
        graphql()
    }, [])

    return (
        <div>
            <h3>This is the home page yo</h3>
            <h3>{ data ? data.dreesen : 'Graphql is not returning data' }</h3>
        </div>
    )
}

export default Home