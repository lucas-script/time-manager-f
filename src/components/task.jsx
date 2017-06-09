import React, { Component } from 'react'
import PageHeader from './page-header'

class Task extends Component {
    render() {
        return (
            <div>
                <PageHeader name="Tasks" small="Create"/>
            </div>
        )
    }
}

export default Task