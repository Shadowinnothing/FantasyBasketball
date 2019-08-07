import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllNBATeams } from '../redux/actions'

const githubCodeUrl = 'https://github.com/Shadowinnothing/FantasyBasketball'

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

    // Returns array of Link tagged Team names
    // Takes the user to /teams/{team_Name} 
    renderTeams = () => this.state.teamNames.map(({ name, teamId }) => <Link className="item" key={ teamId } to={`/teams/${ name.replace(/\s/g, "_") }`} >{ name }</Link>)

    render() {
        return (
            <div className="ui menu">
                <Link className="header item" to="/">
                    Haig/Turley Fantasy Hoops
                </Link>
                <div className="ui simple dropdown item">
                    Teams
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        { this.state.teamNames ? this.renderTeams() : 'error grabbing teams' }
                    </div>
                </div>
                <Link className="item" to="/playerSearch">
                    Search By Last Name
                </Link>
                <a className="item" href={ githubCodeUrl }>
                    Source Code!
                </a>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        NBATeams: state.NBATeams.allNBATeams   // <- all NBA Teams
    }
}

export default connect(mapStateToProps, { getAllNBATeams })(Header)
