import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlayerCard from './PlayerCard'

import nba from '../apis/nba'

import { getAllNBATeams } from '../redux/actions'

class PlayerSearchBar extends Component {

    state = {
        noPlayers: true,
        term: '',
        players: []
    }

    componentDidMount = () => {
        this.props.getAllNBATeams()
    }

    getTeamName = _teamId => {
        const player = this.props.NBATeams.find(el => el.teamId === parseInt(_teamId))
        return typeof player.name === 'string' ? player.name : 'TEAM NAME NOT FOUND'
    }

    onSubmit = async term => {
        const res = await nba.get(`/players/lastName/${term}`)
        const players = res.data.api.players

        if(!res.data.api.players.length)
            window.alert(`No Players named '${ term }' found`)
        
        // get rid of players not on an nba team
        let filteredPlayers = players.filter(player => typeof player.teamId === 'string' )

        // Add the team Name to filteredPlayers
        filteredPlayers = filteredPlayers.map(player =>  {
            if(typeof player.teamId === 'string')
                return {
                    ...player,
                    teamName: this.getTeamName( player.teamId )
                }
            // extra line of defense
            else return {
                ...player,
                teamName: 'Team Name Not Found'
            }
        })
        
        if(!filteredPlayers.length){
            this.setState({ players: [], noPlayers: true })
        } else {
            this.setState({ players: filteredPlayers, noPlayers: false })
        }
    }

    mapPlayers = () => this.state.players.map(player => <PlayerCard key={player.playerId} player={player} />)

    onFormSubmit = e => {
        e.preventDefault()
        
        // TODO: FIX THIS SO IT DOESN'T HIT API WITH SAME CALL
        if (this.state.term !== '' && e.target.value !== this.state.term) {
            this.onSubmit(this.state.term)
        }
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <form onSubmit={ e => this.onFormSubmit(e) } className="ui form">
                        <div className="field">
                            <label>Player Search by Last Name</label>
                            <input 
                                type="text"
                                value={ this.state.term }
                                onChange={ e => this.setState({ term: e.target.value }) }
                            />
                        </div>
                    </form>
                    <br />
                    <button onClick={ () => this.setState({ term: '' }) }>Clear</button>
                </div>
                <div className="ui cards" >
                    { this.state.noPlayers ? <h2>No Players Found</h2> : this.mapPlayers() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams // <- all NBA Teams
    }
}

export default connect(mapStateToProps, { getAllNBATeams })(PlayerSearchBar)