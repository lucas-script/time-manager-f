import '../../../node_modules/jquery/src/jquery'
import '../../../node_modules/bootstrap/dist/js/bootstrap'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

import React, { Component } from 'react'

import Menu from '../menu'
import Routes from '../routes'
import Messages from '../messages/messages'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Menu/>
                <Routes/>
                <Messages/>
            </div>
        )
    }
}

export default App
