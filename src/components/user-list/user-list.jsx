import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { onSearch, onRemove } from './user-list-actions'

class UserList extends Component {

    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }

    componentWillMount() {
        this.props.onSearch()
    }

    renderRows() {
        const list = this.props.list || []
        return (
            list.map(u => (
                <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                        <button className="btn btn-info">
                            <Link className="fa fa-refresh" to={`/users-update/${u._id}`}>Update</Link>
                        </button>
                        <button className="btn btn-danger">
                            <i className="fa fa-trash" onClick={() => this.props.onRemove(u._id)}>Remove</i>
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
