import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const AUTH_URL = `${BASE_URL}/auth`
const VALIDATE_TOKEN_URL = `${BASE_URL}/isTokenValid`

export const authenticate = (email, password) => {
    return dispatch => {
        axios.post(AUTH_URL, {email, password})
            .then(res => {
                dispatch({ type: 'AUTH_USER_AUTHENTICATED', payload: res.data })
            }).catch(err => {
                toastr.error('Error', err.response.data.message)
        })
    }
}

export const logout = () => {
    return { type: 'AUTH_TOKEN_EXPIRED' }
}

export const validateToken = (token) => {
    return dispatch => {
        axios.post(VALIDATE_TOKEN_URL, {token})
            .then(res => {
                if (!res.data.data.valid) {
                    dispatch({ type: 'AUTH_TOKEN_EXPIRED' })
                }
            }).catch(res => {
                dispatch({ type: 'AUTH_TOKEN_EXPIRED' })
                toastr.error('Error', err.response.data)
        })
    }
}

export const onEmailChanged = (e) => {
    return {
        type: 'AUTH_EMAIL_CHANGED',
        payload: e.target.value
    }
}

export const onPasswordChanged = (e) => {
    return {
        type: 'AUTH_PASSWORD_CHANGED',
        payload: e.target.value
    }
}