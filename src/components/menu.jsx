import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from './auth/auth-actions'

import './layout/style.css'

class Menu extends Component {

    constructor(props){
        super(props)
    }

    render() {
        if (!this.props.token) {
            return false
        } else {
            return (
                <nav className="navbar navbar-inverse bg-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <i className="fa fa-calendar-check-o"></i>time-manager
                            </a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a href="#/tasks">Tasks</a></li>
                                <li><a href="#/tasks-create"><small>Create</small></a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#/users">Users</a></li>
                                <li><a href="#/users-create"><small>Create</small></a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a>Hello {this.props.name} </a></li>
                                <li className="logout"><a href="#" onClick={this.props.logout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    name: state.auth.name,
    email: state.auth.email,
    token: state.auth.token
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)