import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerCard from './PlayerCard'

const Table = styled.thead`
    overflow-y: scroll;
    height: 800px;
    display: block;
    width: 400px;
`

const PlayerSearchBar = ({ NBAPlayers, NBATeams }) => {

    const [ searchFilter, setSearchFilter ] = useState('')
    const [ allNBAPlayerCards, setAllNBAPlayerCards ] = useState([])
    const [ filteredNBAPlayerCards, setFilteredNBAPlayerCards ] = useState([])

    useEffect(() => {
        if(NBAPlayers !== undefined && NBAPlayers.length){
            setAllNBAPlayerCards( NBAPlayers.map(player => <PlayerCard key={player.playerId} player={player} />) )
        }
    }, [ NBAPlayers ])

    // filter out players according to the player's first or last name
    useEffect(() => {
        setFilteredNBAPlayerCards( NBAPlayers.map(player => {
            if(player.firstName.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || player.lastName.toLowerCase().includes(searchFilter.toLocaleLowerCase())){
                return <PlayerCard key={player.playerId} player={player} />
            } else return ''
        }))
    }, [ searchFilter ])

    return (
        <div>
            <div className="ui segment">
                <div className="field">
                    <label>Player Search by Name</label>
                    <input 
                        type="text"
                        value={ searchFilter }
                        onChange={ e => setSearchFilter( e.target.value ) }
                    />
                </div>

                <br />
                <button onClick={ () => setSearchFilter('') }>Clear</button>
            </div>

            <Table className="ui very compact table">
                <tr>
                    <td>Name</td>
                    <td>Team</td>
                    <td>Position</td>
                </tr>
                { filteredNBAPlayerCards.length ? filteredNBAPlayerCards : allNBAPlayerCards }
            </Table>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams,   // <- all NBA Teams
        NBAPlayers: state.NBAPlayers.allPlayers // <- all NBA Players
    }
}

export default connect(mapStateToProps, {})(PlayerSearchBar)