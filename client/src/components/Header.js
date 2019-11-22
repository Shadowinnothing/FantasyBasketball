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

// Crappy CSS for logout button
const StyledLogoutButton = styled.button`
    position: absolute;
    right: 0;
    top: 9px;
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
        if(this.props !== prevProps && this.props.userAvatar !== undefined) {
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
                            { this.props.isAuthenticated ? <StyledGravatarImage alt="gravatarImage" src={ 'https://' + this.state.gravatarEmail } /> : 'Haig/Turley Fantasy Hoops' }
                            { this.props.userScreenName }

                            { this.props.isAuthenticated 
                                ? <div className="menu">
                                    { this.wrapLink('/', 'Home') }
                                    { this.wrapLink('/leagues', 'Leagues') }
                                    { this.wrapLink('/social', 'Friends') }
                                </div>

                                : <div className="menu">
                                    { this.wrapLink('/register', 'Register') }
                                    { this.wrapLink('/login', 'Login') }
                                </div>  
                            }
                            
                        </StyledMenuBar>

                        <div className="ui simple dropdown item">
                            Teams
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                { this.state.teamNames ? this.renderTeams() : 'error grabbing teams' }
                            </div>
                        </div>

                        <a className="item" href={ githubCodeUrl }>
                            Source Code!
                        </a>
                        
                        {
                            this.props.isAuthenticated 
                                ?   <StyledLogoutButton id="logoutButton" className="right aligned ui red button" onClick={ this.logout }>
                                        Logout
                                    </StyledLogoutButton> 
                                :   null
                        }
                        

                    </div>

                    <div>
                        { this.props.isAuthenticated 
                            ? <UserNavBar /> 
                            : null 
                        }
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