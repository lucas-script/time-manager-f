import { combineReducers } from 'redux'

import userListReducer from '../components/user-list/user-list-reducer'
import userCreateReducer from '../components/user-create/user-create-reducer'
import userUpdateReducer from '../components/user-update/user-update-reducer'
import taskListReducer from '../components/task-list/task-list-reducer'
import authReducer from '../components/auth/auth-reducer'
import registerReducer from '../components/register/register-reducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    userList: userListReducer,
    userCreate: userCreateReducer,
    userUpdate: userUpdateReducer,
    taskList: taskListReducer,
    auth: authReducer,
    register: registerReducer,
    toastr: toastrReducer
})

export default rootReducer
