import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import { required } from '../../util/validate'

import { onCreate,
    onNameChanged,
    onDateChanged,
    onDurationChanged,
    onProjectChanged,
    loadProjects} from './task-create-actions'

class TaskCreate extends Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentWillMount() {
        this.props.loadProjects()
    }

    validateForm() {
        let errors = []
        let valid = true
        if (!required(this.props.name)) { errors.push('Name is required'); valid=valid&&false }
        if (!required(this.props.date)) { errors.push('Date is required'); valid=valid&&false }
        if (!required(this.props.durationInMin)) { errors.push('Duration is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if (this.validateForm()) {
            this.props.onCreate(this.props.name, this.props.date, this.props.durationInMin, this.props.project)
        } else {
            return false
        }
    }

    renderProjects() {
        let list = this.props.projectList || []
        return (
            list.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
            ))
        )
    }

    render() {

        if (!this.props.token) {
            return (<Redirect to="/auth"/>)
        }

        if (this.props.redirectToList) {
            return (<Redirect to="/tasks"/>)
        }

        return (
            <div>
                <h2>Tasks <small>Create</small></h2>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div role="form" className="user-form">

                            <div className="col-md-offset-4 col-md-4">
                                <input id="name" className="form-control" placeholder="Name *" value={this.props.name}
                                       onChange={this.props.onNameChanged}></input>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <label><small>Project</small></label>
                                <select className="form-control" type="text" value={this.props.project} onChange={this.props.onProjectChanged}>
                                    <option key={null} value={null} default></option>
                                    { this.renderProjects() }
                                </select>
                            </div>
                            <div className="col-md-8"></div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="date" className="form-control" type="date" placeholder="Date *" value={this.props.date}
                                       onChange={this.props.onDateChanged}></input>
                            </div>
                            <div className="col-md-offset-4 col-md-4">
                                <input id="durationInMin" className="form-control" type="number" placeholder="Duration in minutes*" value={this.props.durationInMin}
                                       onChange={this.props.onDurationChanged}></input>
                            </div>
                            <div className="col-md-offset-4 col-md-2">
                                <button className="btn btn-primary" onClick={this.clickHandler}>
                                    <i className="fa fa-plus">Create</i>
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
    name: state.taskCreate.name,
    project: state.taskCreate.project,
    date: state.taskCreate.date,
    projectList: state.taskCreate.projectList,
    durationInMin: state.taskCreate.durationInMin,
    redirectToList: state.taskCreate.redirectToList,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onCreate,
    onNameChanged,
    onDateChanged,
    onDurationChanged,
    onProjectChanged,
    loadProjects,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreate)
