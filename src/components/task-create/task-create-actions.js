import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/tasks`

export const onCreate = (n, dt, d) => {

    const t = {
        name: n,
        date: dt,
        durationInMin: d
    }

    return dispatch => {
        axios.post(`${URL}`, t).then(res => {
            dispatch({ type: 'TASK_CREATE_CREATED' })
            dispatch(clearForm())
            dispatch(redirect())
            toastr.success('Success', 'Task created')
        }).catch(err => {
            toastr.error('Error', err.response.data)
        })
    }
}

export const redirect = () => {
    return dispatch => {
        dispatch({ type: 'TASK_CREATE_REDIRECT' })
        dispatch({ type: 'TASK_CREATE_REDIRECT_RESET' })
    }
}

export const clearForm = () => {
    return { type: 'TASK_CREATE_CLEAR_FORM' }
}

export const onNameChanged = (e) => {
    return {
        type: 'TASK_CREATE_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onDateChanged = (e) => {
    return {
        type: 'TASK_CREATE_DATE_CHANGED',
        payload: e.target.value
    }
}

export const onDurationChanged = (e) => {
    return {
        type: 'TASK_CREATE_DURATION_CHANGED',
        payload: e.target.value
    }
}
