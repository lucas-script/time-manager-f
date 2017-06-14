import React, { Component } from 'react'
import { connect } from 'react-redux'

class Permission extends Component {

    render() {
        const allowedList = this.props.allowed
        const role = this.props.role

        if (allowedList.indexOf(role) !== -1) {
            return this.props.children
        }
        return false
    }
}

const mapStateToProps = state => ({
    role: state.auth.role
})

export default connect(mapStateToProps, null)(Permission)