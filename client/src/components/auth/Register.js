import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { register } from '../../redux/actions'

const Register = ({ register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        screenName: ''
    })

    const { name, email, password, password2, screenName } = formData

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        if(password !== password2) {
            console.log('Passwords do not match')
        } else {
            console.log(screenName)
            register({ name, email, password, screenName })
        }
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" action="create-profile.html" onSubmit={ e => onSubmit(e) } >

                    <div className="form-group">
                        <input id="nameInputBox" type="text" placeholder="Name" name="name" required value={ name } onChange={ e => onChange(e) } />
                    </div>

                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" required value={ email } onChange={ e => onChange(e) }  />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </small>
                    </div>
                    
                    <div>
                        <input
                            type="screenName"
                            placeholder="Screen Name"
                            name="screenName"
                            minLength="6"
                            value={ screenName }
                            onChange={ e => onChange(e) }
                        />
                    </div>

                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={ password }
                        onChange={ e => onChange(e) }
                    />
                    </div>

                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={ password2 }
                        onChange={ e => onChange(e) }
                    />
                    </div>

                    <input id="registerButton" type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)
