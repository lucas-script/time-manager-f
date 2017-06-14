import React from 'react'
import { Route, HashRouter } from 'react-router-dom'

import Task from './task'
import TaskList from './task-list/task-list'
import UserList from './user-list/user-list'
import UserCreate from './user-create/user-create'
import UserUpdate from './user-update/user-update'
import Auth from './auth/auth'
import Home from './home/home'
import Register from './register/register'

export default (props) => (
    <HashRouter>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/users" component={UserList}/>
            <Route exact path="/users-create" component={UserCreate}/>
            <Route exact path="/users-update/:id" component={UserUpdate}/>
            <Route exact path="/tasks" component={TaskList}/>
            <Route path="*" to="/home"/>
        </div>
    </HashRouter>
)