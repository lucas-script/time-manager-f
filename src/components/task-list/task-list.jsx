import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { onSearch, onRemove } from './task-list-actions'

class TaskList extends Component {

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
            list.map(t => (
                <tr key={t._id}>
                    <td>{t.name}</td>
                    <td>{t.user.email}</td>
                    <td>{t.date}</td>
                    <td>{t.durationInMin}</td>
                    <td>
                        <button className="btn btn-info">
                            <Link className="fa fa-refresh" to={`/users-update/${t._id}`}>Update</Link>
                        </button>
                        <button className="btn btn-danger">
                            <i className="fa fa-trash" onClick={() => this.props.onRemove(t._id)}>Remove</i>
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    render() {
        return (
            <div className="container">
                <h2>Tasks <small>List</small></h2>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Duration(m)</th>
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
    list: state.taskList.list
})

const mapDispatchToProps = dispatch => bindActionCreators({ onSearch, onRemove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
