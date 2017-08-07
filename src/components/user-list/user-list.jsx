import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

import { onSearch, onRemove } from './user-list-actions'

const socket = io('https://localhost:3000')

class UserList extends Component {

    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }

    componentWillMount() {
        this.props.onSearch()

        // the component reference
        const self = this
        // gets the event, and refresh the page
        socket.on('profileUpdated', () => {
            console.log('event received')
            self.props.onSearch()
        })
    }

    renderRows() {
        const list = this.props.list || []
        console.log(list)
        return (
            list.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.workload}</td>
                    <td>{user.workloadEnable.toString()}</td>
                    <td>
                        <button className="btn btn-info">
                            <Link className="fa fa-refresh" to={`/users-update/${user._id}`}>Update</Link>
                        </button>
                        <button className="btn btn-danger">
                            <i className="fa fa-trash" onClick={() => this.props.onRemove(user._id)}>Remove</i>
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    render() {
        if(!this.props.token) {
            return (<Redirect to="/auth"/>)
        }

        return (
            <div className="container">
                <h2>Users <small>List</small></h2>

                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Workload</th>
                            <th>Workload Enable</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.userList.list,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({ onSearch, onRemove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
