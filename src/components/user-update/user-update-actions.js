import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/users`

export const onUpdate = (id, n, e, p ,r, changeP) => {

    const u = {
        name: n,
        email: e,
        password: p,
        role: r,
        changePass: changeP
    }

    return dispatch => {
        axios.put(`${URL}/${id}`, u)
            .then(res => {
                dispatch({ type: 'USER_UPDATE_UPDATED', payload: res })
                dispatch(clearForm())
                dispatch(redirect())
                toastr.success('Success', 'User updated')
            }).catch(err => {
                toastr.error('Error', err.response.data.message)
            })
    }
}

export const onInitialLoad = (id) => {
    return dispatch => {
        let r
        axios.get(`${URL}/${id}`)
            .then(res => {
                r = res.data.data
                dispatch({ type: 'USER_UPDATE_LOAD', payload: r })
            })
            .then(res => {
                let name = (r.name) ? r.name : ''
                dispatch(onNameChanged({ target: { value: name }}))
            })
            .then(res => {
                let email = (r.email) ? r.email : ''
                dispatch(onEmailChanged({ target: { value: email }}))
            })
            .then(res => {
                let role = (r.role) ? r.role : ''
                dispatch(onRoleChanged({ target: {value: role }}))
            })
            .catch(err => {
                toastr.error('Error', err.response.data)
        })
    }
}

export const redirect = () => {
    return dispatch => {
        dispatch({ type: 'USER_UPDATE_REDIRECT' })
        dispatch({ type: 'USER_UPDATE_REDIRECT_RESET' })
    }
}

export const clearForm = () => {
    return { type: 'USER_UPDATE_CLEAR_FORM' }
}

export const onNameChanged = (e) => {
    return {
        type: 'USER_UPDATE_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onEmailChanged = (e) => {
    return {
        type: 'USER_UPDATE_EMAIL_CHANGED',
        payload: e.target.value
    }
}

export const onPasswordChanged = (e) => {
    return {
        type: 'USER_UPDATE_PASSWORD_CHANGED',
        payload: e.target.value
    }
}

export const onRoleChanged = (e) => {
    return {
        type: 'USER_UPDATE_ROLE_CHANGED',
        payload: e.target.value
    }
}

export const onChangePassChanged = (e) => {
    return {
        type: 'USER_UPDATE_CHANGE_PASS_CHANGED',
        payload: e.target.checked
    }
}
