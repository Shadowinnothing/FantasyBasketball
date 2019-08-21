import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

// here we go...What needs to be done...
    // Print user info at top?
        // "Shadowinnothing's Leagues"?
    // Button to create new league
    // 2 tables printed
        // IF USER HAS 0 LEAGUES IN EITHER TABLE, PRINT MESSAGE SAYING CREATE A LEAGUE
        // Leagues manager of
            // Link is name of the league
        // Leagues member of
            // Have the link be the name of the league and User's team name
            // If the user is a manager of the team, they do not appear in this table

const CreateLeagueSpan = styled.div`
    border: 1px solid black;
    line-height: 20%;
    margin: 5px;
`

class Leagues extends Component {

    state = {
        userTeams: []
    }

    componentDidMount = async () => {
        const teamsData = await axios.get('/api/fantasyTeams/getAllUserTeams')
        this.setState({ userTeams: teamsData.data.allTeams })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps !== this.props && this.props.isAuthenticated) {
            this.setState({ userTeams: this.props.user.teams })
        }
    }

    renderAllUserTeams = () => {
        return this.state.userTeams.map(team => {
            return (
                <tr key={ team }>
                    <td data-label="Team Name">{ team }</td>
                    <td data-label="League Name">PLACEHOLDER</td>
                    <td data-label="League Type">DAILY</td>
                </tr>
            )
        })
    }

    render() {
        if(!this.props.isAuthenticated) {
            return <div>You Need to be authed to use this page</div>
        }

        return (
            <div>
                { 
                    this.state.userTeams.length === 0
                    ?   
                        <CreateLeagueSpan>
                            <h4>Not a member of a league? Create your own!</h4>
                            <h3>Create League Button here</h3>
                        </CreateLeagueSpan>
                    :
                        <div>
                            <h2>{ this.props.user.name }, here are your fantasy teams</h2>
                            { this.state.userTeams[1] }
                            <table className="ui celled table">
                                <thead>
                                    <tr><th>Team Name</th>
                                    <th>League Name</th>
                                    <th>League Type</th>
                                </tr></thead>
                                <tbody>
                                    { this.renderAllUserTeams() }
                                </tbody>
                            </table>
                            <Link to="/createLeague">Create New League</Link>
                        </div>
                    }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        user: state.Auth.user
    }
}

export default connect(mapStateToProps)(Leagues)