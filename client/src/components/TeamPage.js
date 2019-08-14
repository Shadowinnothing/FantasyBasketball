import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNBATeam } from '../redux/actions'

class TeamPage extends Component {

    state = {
        teamName: null,
        teamId: null
    }

    componentDidMount = async () => {

        this.setState({ 
            teamName: this.props.match.params.teamName.replace('_', ' '),
            teamId: this.props.match.params.teamId
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.match.params.teamName !== this.props.match.params.teamName) {
            this.setState({
                teamName: this.props.match.params.teamName.replace('_', ' '),
                teamId: this.props.match.params.teamId
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Team Name: { this.state.teamName }</h1>
                <h3>Team ID:   { this.state.teamId }</h3>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams,
        team: state.NBATeams.team
    }
}

export default connect(mapStateToProps, { getNBATeam })(TeamPage)
