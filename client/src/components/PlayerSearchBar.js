import React, { Component } from 'react'

import PlayerCard from './PlayerCard'

import nba from '../apis/nba'

import { getTeamName } from '../utils/getTeamName'

export default class PlayerSearchBar extends Component {

    state = {
        term: '',
        players: []
    }

    onSubmit = async term => {
        const res = await nba.get(`/players/lastName/${term}`)
        const players = res.data.api.players

        if(!res.data.api.players.length)
            window.alert(`No Players named '${ term }' found`)

        // Add the team Name to filteredPlayers
        let filteredPlayers = players.map(player =>  ({ ...player, teamName: getTeamName(player.teamId)}))

        // get rid of players not on an nba team
        filteredPlayers = filteredPlayers.filter(player => typeof player.teamName === 'string' )

        console.log(filteredPlayers)

        this.setState({ players: filteredPlayers })
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
                    { this.mapPlayers() }
                </div>
            </div>
        )
    }
}