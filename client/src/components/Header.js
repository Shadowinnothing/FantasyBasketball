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

const StyledGravatarImage = styled.img`
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
        teamNames: [],
        loaded: false,
        gravatarEmail: '',
        screenName: ''
    }

    componentDidMount = () => {
        this.props.getAllNBATeams()
    }

    componentDidUpdate = (prevProps) => {
        if(this.props !== prevProps) {
            this.setState({
                gravatarEmail: this.props.userAvatar.substr(2),
                loaded: true,
                teamNames: this.props.NBATeams,
                screenName: this.props.userScreenName
            })
        }
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
        if(this.state.loaded)
            return (
                <div>
                    <div className="ui menu">

                        <StyledMenuBar onClick={ () => console.log('home clicked')} className="ui simple dropdown item">
                            <StyledGravatarImage alt="yeet" src={ 'https://' + this.state.gravatarEmail } />
                            { this.props.userScreenName }
                            <div className="menu">
                                { this.wrapLink('/', 'Home') }
                                { this.wrapLink('/createLeague', 'Create League') }
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
        return (<div>Loading...</div>)
    }
}

const mapStateToProps = state => {
    const userAvatar = state.Auth.user ? state.Auth.user.avatar : ''
    const userScreenName = state.Auth.user ? state.Auth.user.screenName : ''
    return {
        NBATeams: state.NBATeams.allNBATeams,   // <- all NBA Teams
        isAuthenticated : state.Auth.isAuthenticated,
        userAvatar,
        userScreenName 
    }
}

export default connect(mapStateToProps, { getAllNBATeams, logout })(Header)