import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { onSearch, onRemove, onFilter, onSDateChanged, onEDateChanged } from './task-list-actions'
import { formatDate } from '../../util/format'

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }

    componentWillMount() {
        this.props.onSearch()
    }

    formatDate(d) {
        return formatDate(d)
    }

    renderRows() {
        const list = this.props.list || []
        return (
            list.map(t => (
                <tr key={t._id} className="">
                    <td>{t.name}</td>
                    <td>{t.user.email}</td>
                    <td>{this.formatDate(t.date)}</td>
                    <td>{t.durationInMin}</td>
                    <td>
                        <button className="btn btn-info">
                            <Link className="fa fa-refresh" to={`/tasks-update/${t._id}`}>Update</Link>
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
                <div className="form-inline">
                    <div className="form-group">
                        <label><small>(Start date)</small></label>
                        <input type="date" value={this.props.sDate} onChange={this.props.onSDateChanged} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label><small>(End date)</small></label>
                        <input type="date" value={this.props.eDate} onChange={this.props.onEDateChanged} className="form-control"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => this.props.onFilter(this.props.sDate, this.props.eDate)}>Filter</button>
                </div>
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

const mapStateToProps = (state) => ({
    list: state.taskList.list,
    sDate: state.taskList.sDate,
    eDate: state.taskList.eDate
})

const mapDispatchToProps = dispatch => bindActionCreators({ onSearch, onRemove, onFilter, onSDateChanged, onEDateChanged }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
