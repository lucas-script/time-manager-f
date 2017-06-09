import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { toastr } from 'react-redux-toastr'

import { required, email } from '../../util/validate'

import { onUpdate,
    onInitialLoad,
    onNameChanged,
    onEmailChanged,
    onPasswordChanged,
    onRoleChanged,
    onChangePassChanged} from './user-update-actions'

class UserUpdate extends Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentWillMount() {
        this.props.onInitialLoad(this.props.match.params.id)
    }

    validateForm() {
        let errors = []
        let valid = true
        if (!required(this.props.name)) { errors.push('Name is required'); valid=valid&&false }
        if (!required(this.props.email)) { errors.push('Email is required'); valid=valid&&false }
        if (!email(this.props.email)) { errors.push('Email must be valid'); valid=valid&&false }
        if (this.props.changePass) {
            if (!required(this.props.password)) { errors.push('Password is required'); valid=valid&&false }
        }
        if (!required(this.props.role)) { errors.push('Role is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if (this.validateForm()) {
            this.props.onUpdate(this.props.match.params.id, this.props.name, this.props.email,
                this.props.password, this.props.role, this.props.changePass)
        } else {
            return false
        }
    }

    render() {
        if (!this.props.token) {
            return (<Redirect to="/auth"/>)
        }

        if (this.props.redirectToList) {
            return (<Redirect to='/users'/>)
        }

        return (
            <div>
                <h2>Users <small>Update</small></h2>

                <div className="panel panel-default">
                    <div className="panel-body">
                        <div role="form" className="user-form justify-content-md-left">

                            <div className="col-md-offset-4 col-md-4">
                                <input id="name" className="form-control" placeholder="Name" value={this.props.name}
                                       onChange={this.props.onNameChanged}></input>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="email" className="form-control" placeholder="Email" value={this.props.email}
                                       onChange={this.props.onEmailChanged}></input>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="password" type="password" className="form-control" placeholder="Password" value={this.props.password}
                                       onChange={this.props.onPasswordChanged}></input>
                            </div>
                            <div className="col-md-4">
                                <div className="checkbox">
                                    <label><input type="checkbox" checked={this.props.changePass}
                                        onChange={this.props.onChangePassChanged}/>Change Password{this.props.changePass}</label>
                                </div>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <div className="form-group">
                                    <label>Role</label>
                                    <select className="form-control" value={this.props.role}
                                            onChange={this.props.onRoleChanged}>
                                        <option value="regular">regular</option>
                                        <option value="manager">manager</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-offset-4 col-md-2">
                                <button className="btn btn-primary"
                                        onClick={this.clickHandler}>
                                    <i className="fa fa-plus">Update</i>
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
    name: state.userUpdate.name,
    email: state.userUpdate.email,
    password: state.userUpdate.password,
    role: state.userUpdate.role,
    changePass: state.userUpdate.changePass,
    redirectToList: state.userUpdate.redirectToList,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onUpdate,
    onInitialLoad,
    onNameChanged,
    onEmailChanged,
    onPasswordChanged,
    onRoleChanged,
    onChangePassChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate)
