import React, { Component } from 'react'
import { connect } from 'react-redux'

class CreateLeaguePage extends Component {

    isAuthenticated = this.props.isAuthenticated

    render(){
        return (
            <div>
                { this.isAuthenticated ? 'User is ready to create league!' : 'You need to be authed to create a league' }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(CreateLeaguePage)
