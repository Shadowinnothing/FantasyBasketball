import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import UserNavBar from './UserNavBar'

import { getAllNBATeams, logout } from '../redux/actions'

const githubCodeUrl = 'https://github.com/Shadowinnothing/FantasyBasketball'

// Menu bar on left side of the Header
const StyledMenuBar = styled.div`
    background-color: #DDDDDD !important;
    width: 200px;
`

// Link tags that are each item in the menu
const StyledLink = styled.div`
    
`

// Text inside the Link tag
const StyledText = styled.p`
    color: green !important;
`

class Header extends Component {

    state = {
        teamNames: []
    }

    componentDidMount = () => {
        this.props.getAllNBATeams()
    }

    componentDidUpdate = (prevProps) => {
        if(this.props !== prevProps)
            this.setState({ teamNames: this.props.NBATeams })
    }

    logout = () => {
        this.props.logout()
    }

    // Wrap link into divs for the menu bar farthest left on header
    // route is which page loads and name is the text on the box
    wrapLink = (route, name) => {
        return ( <StyledLink className="item"> <Link to={ route }><StyledText>{ name }</StyledText></Link> </StyledLink> )
    }

    // Returns array of Link tagged Team names
    // Takes the user to /teams/{team_Name} 
    renderTeams = () => this.state.teamNames.map(({ name, teamId }) => <Link className="item" key={ teamId } to={`/teams/${teamId}/${ name.replace(/\s/g, "_") }`} >{ name }</Link>)

    render() {
        return (
            <div>
                <div className="ui menu">

                    <StyledMenuBar onClick={ () => console.log('home clicked')} className="ui simple dropdown item">
                        Menu
                        <div className="menu">
                            { this.wrapLink('/', 'Home') }
                            { this.wrapLink('/yeet', 'YEET') }
                        </div>
                    </StyledMenuBar>

                    <div className="ui simple dropdown item">
                        Teams
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            { this.state.teamNames ? this.renderTeams() : 'error grabbing teams' }
                        </div>
                    </div>

                    <Link className="item" to="/playerSearch">
                        Search Players
                    </Link>

                    <a className="item" href={ githubCodeUrl }>
                        Source Code!
                    </a>

                    <Link className="item align right" to="/register">
                        { this.state.loggedIn ? 'Profile' : 'Register' }
                    </Link>

                    <Link className="item" to="/login">
                        { this.state.isAuthenticated ? 'Logout' : 'Login' }
                    </Link>
                    <button onClick={ this.logout }>
                        Logout
                    </button>
                </div>

                <div>
                    { this.props.isAuthenticated ? <UserNavBar /> : null }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams,   // <- all NBA Teams
        isAuthenticated : state.Auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { getAllNBATeams, logout })(Header)