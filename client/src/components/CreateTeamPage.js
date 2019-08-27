import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createFantasyTeam } from '../redux/actions'

const CreateTeamPage = ({ match, isAuthenticated, userAuth, createFantasyTeam, history }) => {

    const [formData, setFormData] = useState({
        teamName: ''
    })

    const { teamName } = formData

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        const newTeam = await createFantasyTeam({ 
            teamName, 
            teamOwner: userAuth.user._id,
            leagueId: match.params.leagueId,
            userToken: userAuth.token
        })
        
        history.push(`/leagues/${match.params.leagueId}/team/${newTeam._id}`)
    }

    // Redirect if not logged in
    if(!isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Create New Team</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Team!</p>
                <form className="form" onSubmit={ e => onSubmit(e) } >
                    <div>
                        <input
                            type="teamName"
                            placeholder="Team Name"
                            name="teamName"
                            minLength="4"
                            maxLength="40"
                            value={ teamName }
                            onChange={ e => onChange(e) }
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        userAuth: state.Auth
    }
}

export default connect(mapStateToProps, { createFantasyTeam })(CreateTeamPage)
