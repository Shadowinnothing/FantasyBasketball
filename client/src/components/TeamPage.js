import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNBATeam } from '../redux/actions'

import PlayerCard from './PlayerCard'

class TeamPage extends Component {

    state = {
        teamName: null,
        teamId: null
    }

    componentDidMount = () => {
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

    mapPlayers = () => {
        return this.props.NBAPlayers.map(player => {
            if(player.teamId === this.state.teamId) {
                player.teamName = this.state.teamName
                return <PlayerCard key={player.playerId} player={player} />
            }
            return null
        })
    }

    render() {
        return (
            <div>
                <h1>Team Name: { this.state.teamName }</h1>
                <h3>Team ID:   { this.state.teamId }</h3>
                <div className="ui cards" >
                    { this.props.NBATeams ? this.mapPlayers() : 'Loading Players...' }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams,
        team: state.NBATeams.team,
        NBAPlayers: state.NBAPlayers.allPlayers
    }
}

export default connect(mapStateToProps, { getNBATeam })(TeamPage)
