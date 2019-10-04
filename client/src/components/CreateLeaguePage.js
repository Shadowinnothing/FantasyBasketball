import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createNewLeague } from '../redux/actions'

const CreateLeaguePage = ({ isAuthenticated, userAuth, createNewLeague, history, userId }) => {

    const [formData, setFormData] = useState({
        leagueName: '',
        leagueType: '',
        //leagueManagers: '' // <- send in current userId
    })

    const { leagueName, leagueType  } = formData

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        const newLeague = await createNewLeague({ leagueName, leagueType, userToken: userAuth.token, userId })
        //console.log(newLeague)
        const newLeagueId = newLeague._id
        history.push(`/leagues/${newLeagueId}`)
    }

    // Redirect if not logged in
    if(!isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Create New Fantasy Basketball League</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your League!</p>
                <form className="form" onSubmit={ e => onSubmit(e) } >
                    <div>
                        <input
                            type="leagueName"
                            placeholder="League Name"
                            name="leagueName"
                            minLength="6"
                            maxLength="30"
                            value={ leagueName }
                            onChange={ e => onChange(e) }
                        />
                    </div>

                    { /* This needs to be converted to a Dropdown */ }
                    <div>
                        <input
                            type="leagueType"
                            placeholder="League Type"
                            name="leagueType"
                            value={ leagueType }
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
        userAuth: state.Auth,
        userId: state.Auth.user._id
    }
}

export default connect(mapStateToProps, { createNewLeague })(CreateLeaguePage)
