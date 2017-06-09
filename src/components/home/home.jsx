import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    render() {

        if (!this.props.token) {
            return (<Redirect to="/auth"/>)
        }

        return (
            <div className="jumbotron">
                <h1>Welcome to Time Manager v1.0.0</h1>
                <p>A simple time manager</p>
                <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps, null)(Home)
