import React, { Component } from 'react'

class TeamPage extends Component {

    state = {
        data: ''
    }

    componentDidMount = async () => {
        
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
