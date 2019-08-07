import React, { Component } from 'react'

import axios from 'axios'

class TeamPage extends Component {

    state = {
        data: ''
    }

    componentDidMount = async () => {
        const res = await axios.get('/api/test')
        this.setState({ data: res.data.message })
    }

    render() {
        return (
            <div>
                <h1>{ this.props.match.params.teamName }</h1>
                { this.state.data }
            </div>
        )
    }
}

export default TeamPage
