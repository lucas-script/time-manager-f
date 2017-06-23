import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/tasks`

export const onUpdate = (id, n, dt, d) => {

    const t = {
        name: n,
        date: dt,
        durationInMin: d
    }

    return dispatch => {
        axios.put(`${URL}/${id}`, t)
            .then(res => {
                dispatch({ type: 'TASK_UPDATE_UPDATED', payload: res })
                dispatch(clearForm())
                dispatch(redirect())
                toastr.success('Success', 'Task updated')
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
                dispatch({ type: 'TASK_UPDATE_LOAD', payload: r })
            })
            .then(res => {
                let name = (r.name) ? r.name : ''
                dispatch(onNameChanged({ target: { value: name }}))
            })
            .then(res => {
                let date = (r.date) ? r.date : ''
                console.log(date)
                let fdate = new Date(date).toISOString().slice(0, 10)
                console.log(fdate)
                dispatch(onDateChanged({ target: { value: fdate }}))
            })
            .then(res => {
                let durationInMin = (r.durationInMin) ? r.durationInMin : ''
                dispatch(onDurationChanged({ target: {value: durationInMin }}))
            })
            .catch(err => {
                toastr.error('Error', err.response.data)
        })
    }
}

export const redirect = () => {
    return dispatch => {
        dispatch({ type: 'TASK_UPDATE_REDIRECT' })
        dispatch({ type: 'TASK_UPDATE_REDIRECT_RESET' })
    }
}

export const clearForm = () => {
    return { type: 'TASK_UPDATE_CLEAR_FORM' }
}

export const onNameChanged = (e) => {
    return {
        type: 'TASK_UPDATE_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onDateChanged = (e) => {
    return {
        type: 'TASK_UPDATE_DATE_CHANGED',
        payload: e.target.value
    }
}

export const onDurationChanged = (e) => {
    return {
        type: 'TASK_UPDATE_DURATION_CHANGED',
        payload: e.target.value
    }
}
