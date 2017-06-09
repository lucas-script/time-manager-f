import React, { Component } from 'react'
import ReactToastr from 'react-redux-toastr'

import '../../../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'

class Messages extends Component {

    render() {
        return (
            <ReactToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates={true}
                position='top-right'
                transitionIn="fadeIn"
                transitionOut="fadeOut"/>
        )
    }
}

export default Messages
