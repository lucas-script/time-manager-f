import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { toastr } from 'react-redux-toastr'

import { required } from '../../util/validate'

import { onUpdate,
    onInitialLoad,
    onNameChanged,
    onDateChanged,
    onDurationChanged} from './task-update-actions'

class TaskUpdate extends Component {

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
        if (!required(this.props.date)) { errors.push('Date is required'); valid=valid&&false }
        if (!required(this.props.durationInMin)) { errors.push('Duration is required'); valid=valid&&false }
        errors.forEach(err => {
            toastr.error('Error', err)
        })
        return valid
    }

    clickHandler() {
        if (this.validateForm()) {
            this.props.onUpdate(this.props.match.params.id, this.props.name, this.props.date, this.props.durationInMin)
        } else {
            return false
        }
    }

    render() {
        if (!this.props.token) {
            return (<Redirect to="/auth"/>)
        }

        if (this.props.redirectToList) {
            return (<Redirect to='/tasks'/>)
        }

        return (
            <div>
                <h2>Tasks <small>Update</small></h2>

                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="form-horizontal">

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="name" className="form-control" placeholder="Name *" value={this.props.name}
                                           onChange={this.props.onNameChanged}></input>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="date" type="date" className="form-control" placeholder="Date *" value={this.props.date}
                                           onChange={this.props.onDateChanged}></input>(mm/dd/yyyy)
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-offset-4 col-md-4">
                                    <input id="duration" type="number" className="form-control" placeholder="Duration in minutes" value={this.props.durationInMin}
                                           onChange={this.props.onDurationChanged}></input>
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
    name: state.taskUpdate.name,
    date: state.taskUpdate.date,
    durationInMin: state.taskUpdate.durationInMin,
    redirectToList: state.taskUpdate.redirectToList,
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    onUpdate,
    onInitialLoad,
    onNameChanged,
    onDateChanged,
    onDurationChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskUpdate)
