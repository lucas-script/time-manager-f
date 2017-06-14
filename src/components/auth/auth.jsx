import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toastr } from 'react-redux-toastr'
import { Redirect } from 'react-router-dom'

import { authenticate, onEmailChanged, onPasswordChanged } from './auth-actions'
import { required, email } from '../../util/validate'

class Auth extends Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    validateForm() {
        let errors = []
        let valid = true
        if (!required(this.props.email)) { errors.push('Email is required'); valid=valid&&false }
        if (!email(this.props.email)) { errors.push('Email must be valid'); valid=valid&&false }
        if (!required(this.props.password)) { errors.push('Password is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if(this.validateForm()) {
            this.props.authenticate(this.props.email, this.props.password)
        } else {
            return false
        }
    }

    render() {

        if (this.props.token) {
            return (<Redirect to="/"/>)
        }

        return (
            <div className="login">
                <div className="jumbotron">
                    <div className="container">

                        <div className="col-md-offset-4">
                            <h3>Authentication <small>Time Manager</small></h3>
                        </div>

                        <form className="form-horizontal">

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="email" value={this.props.email} onChange={this.props.onEmailChanged} type="text" className="form-control" placeholder="Email *"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="password" value={this.props.password} onChange={this.props.onPasswordChanged} type="password" className="form-control" placeholder="Password *"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-2">
                                    <button type="button" onClick={this.clickHandler} className="btn btn-primary">Sign in</button>
                                </div>
                                <div className="col-md-2">
                                    <a type="button" href="#/register" className="btn btn-success pull-right">Sign up</a>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    authenticate,
    onEmailChanged,
    onPasswordChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
