import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//import axios from 'axios'

const CreateLeagueSpan = styled.div`
    border: 1px solid black;
    line-height: 20%;
    margin: 5px;
`

const StyledLink = styled.button`
    background: black;
    width: 150px;
    height: 50px;
    text-align: center;
`

const LeaguesPage = ({ usersLeagues, usersTeams, user, isAuthenticated, history }) => {

    const [ allUserLeagues, setAllUsersLeagues ] = useState([])
    const [ allUserTeams, setAllUsersTeams ] = useState([])

    useEffect(() => {
        setAllUsersLeagues(usersLeagues)
        setAllUsersTeams(usersTeams)
    }, [])

    useEffect(() => {
        setAllUsersLeagues(usersLeagues)
        setAllUsersTeams(usersTeams)
    }, [isAuthenticated, usersLeagues, user, usersTeams])

    const getTeamName = _leagueId => {
        let team = allUserTeams[0].teamName !== 'undefined'
            ? allUserTeams.filter(({ leagueId }) => leagueId === _leagueId)[0]
            : undefined
        return team !== undefined ? team.teamName : '*No Team Name*'
    }

    const renderAllUserTeams = () => {
        return allUserLeagues.map(({ leagueName, leagueType, _id }) => {
            return (
                <tr key={ _id } onClick={ () => history.push(`/leagues/${_id}`) }>
                    <td data-label="Team Name">{ getTeamName(_id) }</td>
                    <td data-label="League Name">{ leagueName }</td>
                    <td data-label="League Type">{ leagueType }</td>
                </tr>
            )
        })
    }

    if(!isAuthenticated) {
        return <div>You Need to be authed to use this page</div>
    }

    return (
        <div>
            { 
                !allUserLeagues.length
                ?   
                    <CreateLeagueSpan>
                        <h4>Not a member of a league? Start one today!</h4>
                        <StyledLink><Link to="/createLeague">Create New League</Link></StyledLink>
                    </CreateLeagueSpan>
                :
                    <div>
                        <h2>{ user.name }, here are your fantasy teams</h2>
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>League Name</th>
                                    <th>League Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                { renderAllUserTeams() }
                            </tbody>
                        </table>
                        <StyledLink><Link to="/createLeague">Create New League</Link></StyledLink>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth.user,
        usersLeagues: state.Leagues.usersLeagues,
        usersTeams: state.FantasyTeams.usersTeams
    }
}

export default connect(mapStateToProps)(LeaguesPage)