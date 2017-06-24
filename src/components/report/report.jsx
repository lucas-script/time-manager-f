import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import { onSDateChanged, onEDateChanged, onUserChanged, onGenerate, loadUsers } from './report-actions'
import { formatDate } from '../../util/format'
import { required } from '../../util/validate'

class Report extends Component {

    constructor(props) {
        super(props)
        this.renderReport = this.renderReport.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    formatDate(d) {
        return formatDate(d)
    }

    componentWillMount() {
        this.props.loadUsers()
    }

    validateForm() {
        let errors = []
        let valid = true
        if (!required(this.props.sDate)) { errors.push('Start date is required'); valid=valid&&false }
        if (!required(this.props.eDate)) { errors.push('End date is required'); valid=valid&&false }
        if (!required(this.props.user)) { errors.push('User is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if (this.validateForm()) {
            this.props.onGenerate(this.props.user, this.props.sDate, this.props.eDate)
        } else {
            return false
        }
    }

    renderOptions() {
        const list = this.props.usersList || []
        return (
            list.map(u => (
                <option key={u._id} value={u._id}>{u.name}</option>
            ))
        )
    }

    renderReport() {
        const list = this.props.reportList || []
        return (
            list.map(r => (
                <div key={r._id}>
                    <h2>Date { this.formatDate(r._id) }</h2>
                    <h3>Total worked in minutes: {r.tasksSum}</h3>
                    <ul className="list-group">
                        {
                            r.tasks.map( (t, i) => (
                                <li key={i} className="list-group-item">{t.task}</li>
                            ))
                        }
                    </ul>
                </div>
            ))
        )
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Report <small>Tasks</small></h2>
                    <div className="form-inline">
                        <div className="form-group">
                            <label><small>(Start date)</small></label>
                            <input type="date" value={this.props.sDate} onChange={this.props.onSDateChanged} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label><small>(End date)</small></label>
                            <input type="date" value={this.props.eDate} onChange={this.props.onEDateChanged} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label><small>(User)</small></label>
                            <select className="form-control" type="text" value={this.props.user} onChange={this.props.onUserChanged}>
                                <option key={null} value={null} default>---</option>
                                { this.renderOptions() }
                            </select>
                        </div>

                        <button className="btn btn-primary" onClick={this.clickHandler}>Generate</button>
                    </div>
                </div>
                <div className="container">
                    { this.renderReport() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reportList: state.report.reportList,
    usersList: state.report.usersList,
    sDate: state.report.sDate,
    eDate: state.report.eDate,
    user: state.report.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onSDateChanged, onEDateChanged, onUserChanged, onGenerate, loadUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Report)
