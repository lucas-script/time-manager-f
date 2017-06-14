import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import { required, email } from '../../util/validate'

import { register,
    onNameChanged,
    onEmailChanged,
    onPasswordChanged } from './register-actions'

class Register extends Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    validateForm() {
        let errors = []
        let valid = true
        if (!required(this.props.name)) { errors.push('Name is required'); valid=valid&&false }
        if (!required(this.props.email)) { errors.push('Email is required'); valid=valid&&false }
        if (!email(this.props.email)) { errors.push('Email must be valid'); valid=valid&&false }
        if (!required(this.props.password)) { errors.push('Password is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if (this.validateForm()) {
            this.props.register(this.props.name, this.props.email, this.props.password)
        } else {
            return false
        }
    }

    render() {

        if (this.props.redirectToLogin) {
            return (<Redirect to="/auth"/>)
        }

        return (
            <div className="login">
                <div className="jumbotron">
                    <div className="container">

                        <div className="col-md-offset-4">
                            <h3>Register <small>Join us!</small></h3>
                        </div>

                        <form className="form-horizontal">

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="name" className="form-control" placeholder="Name *" value={this.props.name}
                                           onChange={this.props.onNameChanged}></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="email" className="form-control" placeholder="Email *" value={this.props.email}
                                           onChange={this.props.onEmailChanged}></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="password" type="password" className="form-control" placeholder="Password *" value={this.props.password}
                                           onChange={this.props.onPasswordChanged}></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-2">
                                    <button type="button" onClick={this.clickHandler} className="btn btn-primary">Register</button>
                                </div>
                                <div className="col-md-2">
                                    <a type="button" href="#/auth" className="btn btn-success pull-right">Go to Login</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    name: state.register.name,
    email: state.register.email,
    password: state.register.password,
    redirectToLogin: state.register.redirectToLogin
})

const mapDispatchToProps = dispatch => bindActionCreators({
    register,
    onNameChanged,
    onEmailChanged,
    onPasswordChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
