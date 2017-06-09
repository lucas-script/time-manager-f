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
        return (
            <div>
                <h2>User <small>Register</small></h2>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div role="form" className="user-form">

                            <div className="col-md-offset-4 col-md-4">
                                <input id="name" className="form-control" placeholder="Name *" value={this.props.name}
                                       onChange={this.props.onNameChanged}></input>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="email" className="form-control" placeholder="Email *" value={this.props.email}
                                       onChange={this.props.onEmailChanged}></input>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="password" type="password" className="form-control" placeholder="Password *" value={this.props.password}
                                       onChange={this.props.onPasswordChanged}></input>
                            </div>
                            <div className="col-md-offset-4 col-md-2">
                                <button className="btn btn-primary" onClick={this.clickHandler}>
                                    <i className="fa fa-plus">Register</i>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.register.name,
    email: state.register.email,
    password: state.register.password,
    redirectToList: state.userCreate.redirectToList
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onCreate,
    onNameChanged,
    onEmailChanged,
    onPasswordChanged,
    onRoleChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
