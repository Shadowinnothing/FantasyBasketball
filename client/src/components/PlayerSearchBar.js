import React, { Component } from 'react'
import { connect } from 'react-redux'

import PlayerCard from './PlayerCard'

import axios from 'axios'

class PlayerSearchBar extends Component {

    state = {
        noPlayers: true,
        term: '',
        players: [],
        tempPlayers: []
    }

    getTeamName = _teamId => {
        const player = this.props.NBATeams.find(el => el.teamId === parseInt(_teamId))
        if(player !== undefined)
            return typeof player.name === 'string' ? player.name : 'TEAM NAME NOT FOUND'
    }

    onSubmit = async term => {
        const res = await axios.get(`/stats/players/search/${term}`)
        const players = res.data.relatedPlayers

        if(!players.length)
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
                            <label>Player Search by Name</label>
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
                { this.state.tempPlayers.map(player => <h1 key={player.playerId}>{ player.lastName }</h1>) }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams,   // <- all NBA Teams
        NBAPlayers: state.NBAPlayers            // <- all NBA Players, this is a promise and super stupid and ugly code
    }
}

export default connect(mapStateToProps, {})(PlayerSearchBar)