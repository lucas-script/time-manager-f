import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { onSearch, onRemove, onFilter, onSDateChanged, onEDateChanged, loadWorkloads, loadTasksSum } from './task-list-actions'
import { formatDate } from '../../util/format'

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }

    componentWillMount() {
        this.props.onSearch()
        this.props.loadWorkloads()
        this.props.loadTasksSum()
    }

    formatDate(d) {
        return formatDate(d)
    }

    rowColor(user, date) {
        let hasWorkloadEnable = this.props.workloadsMap.find((element) => {
            return element.key === user
        })

        // workload disabled
        if (!hasWorkloadEnable) return 'none'
        // user workload
        let workload = hasWorkloadEnable.value

        // tasksSum key
        let key = `${user}_${date}`
        let tasksSum = this.props.tasksSumMap.find((element) => {
            return element.key === key
        })

        let sum = tasksSum.value
        if (sum >= workload) {
            return 'green'
        } else {
            return 'red'
        }
    }

    renderRows() {
        const list = this.props.list || []
        return (
            list.map((task) => (
                <tr key={task._id} className={this.rowColor(task.user._id, this.formatDate(task.date))}>
                    <td>{task.name}</td>
                    <td>{task.user.email}</td>
                    <td>{this.formatDate(task.date)}</td>
                    <td>{task.durationInMin}</td>
                    <td>
                        <button className="btn btn-info">
                            <Link className="fa fa-refresh" to={`/tasks-update/${task._id}`}>Update</Link>
                        </button>
                        <button className="btn btn-danger">
                            <i className="fa fa-trash" onClick={() => this.props.onRemove(task._id)}>Remove</i>
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
                <table className="table table-hover">
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
    eDate: state.taskList.eDate,
    workloadsMap: state.taskList.workloadsMap,
    tasksSumMap: state.taskList.tasksSumMap
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onSearch, onRemove, onFilter, onSDateChanged, onEDateChanged, loadWorkloads, loadTasksSum
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
