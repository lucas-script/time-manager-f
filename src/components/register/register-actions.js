import axios from 'axios'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/register`

export const register = (name, email, password) => {
    return dispatch => {
        axios.post(URL, {name, email, password})
            .then(res => {
                dispatch({ type: 'REGISTER_REGISTERED_USER' })
                dispatch({ type: 'REGISTER_RESET_REDIRECT' })
            }).catch(err => {
                console.log(err)
        })
    }
}

export const onNameChanged = (e) => {
    return {
        type: 'REGISTER_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onEmailChanged = (e) => {
    return {
        type: 'REGISTER_EMAIL_CHANGED',
        payload: e.target.value
    }
}

export const onPasswordChanged = (e) => {
    return {
        type: 'REGISTER_PASSWORD_CHANGED',
        payload: e.target.value
    }
}
