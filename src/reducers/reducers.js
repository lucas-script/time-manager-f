import { combineReducers } from 'redux'

import userListReducer from '../components/user-list/user-list-reducer'
import userCreateReducer from '../components/user-create/user-create-reducer'
import userUpdateReducer from '../components/user-update/user-update-reducer'
import taskListReducer from '../components/task-list/task-list-reducer'
import taskCreateReducer from '../components/task-create/task-create-reducer'
import taskUpdateReducer from '../components/task-update/task-update-reducer'
import authReducer from '../components/auth/auth-reducer'
import registerReducer from '../components/register/register-reducer'
import meReducer from '../components/me/me-reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    userList: userListReducer,
    userCreate: userCreateReducer,
    userUpdate: userUpdateReducer,
    taskList: taskListReducer,
    taskCreate: taskCreateReducer,
    taskUpdate: taskUpdateReducer,
    auth: authReducer,
    register: registerReducer,
    me: meReducer,
    toastr: toastrReducer
})

export default rootReducer
