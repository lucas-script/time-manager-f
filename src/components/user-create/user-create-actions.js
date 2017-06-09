import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/users`

export const onCreate = (n, e, p ,r) => {

    const u = {
        name: n,
        email: e,
        password: p,
        role: r
    }

    return dispatch => {
        axios.post(`${URL}`, u).then(res => {
            dispatch({ type: 'USER_CREATE_CREATED' })
            dispatch(clearForm())
            dispatch(redirect())
            toastr.success('Success', 'User created')
        }).catch(err => {
            toastr.error('Error', err.response.data)
        })
    }
}

export const redirect = () => {
    return dispatch => {
        dispatch({ type: 'USER_CREATE_REDIRECT' })
        dispatch({ type: 'USER_CREATE_REDIRECT_RESET' })
    }
}

export const clearForm = () => {
    return { type: 'USER_CREATE_CLEAR_FORM' }
}

export const onNameChanged = (e) => {
    return {
        type: 'USER_CREATE_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onEmailChanged = (e) => {
    return {
        type: 'USER_CREATE_EMAIL_CHANGED',
        payload: e.target.value
    }
}

export const onPasswordChanged = (e) => {
    return {
        type: 'USER_CREATE_PASSWORD_CHANGED',
        payload: e.target.value
    }
}

export const onRoleChanged = (e) => {
    return {
        type: 'USER_CREATE_ROLE_CHANGED',
        payload: e.target.value
    }
}
