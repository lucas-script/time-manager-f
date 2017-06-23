import React from 'react'
import { Route, HashRouter } from 'react-router-dom'

import TaskList from './task-list/task-list'
import TaskCreate from './task-create/task-create'
import TaskUpdate from './task-update/task-update'
import UserList from './user-list/user-list'
import UserCreate from './user-create/user-create'
import UserUpdate from './user-update/user-update'
import Auth from './auth/auth'
import Home from './home/home'
import Register from './register/register'
import Me from './me/me'

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
            <Route exact path="/tasks-create" component={TaskCreate}/>
            <Route exact path="/tasks-update/:id" component={TaskUpdate}/>
            <Route exact path="/me" component={Me}/>
            <Route path="*" to="/home"/>
        </div>
    </HashRouter>
)