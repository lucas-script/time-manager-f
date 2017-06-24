import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/reports`
const USERS_URL = `${BASE_URL}/reports/users`

export const onGenerate = (user, sDate, eDate) => {
    return dispatch => {
        axios.get(`${URL}?user=${user}&sdate=${sDate}&edate=${eDate}`)
            .then(res => {
                dispatch({ type: 'REPORT_GENERATED', payload: res.data.data })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const loadUsers = () => {
    return dispatch => {
        axios.get(USERS_URL)
            .then(res => {
                dispatch({ type: 'REPORT_USERS_LOADED', payload: res.data.data })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const onSDateChanged = (e) => {
    return {
        type: 'REPORT_SDATE_CHANGED',
        payload: e.target.value
    }
}

export const onEDateChanged = (e) => {
    return {
        type: 'REPORT_EDATE_CHANGED',
        payload: e.target.value
    }
}

export const onUserChanged = (e) => {
    return {
        type: 'REPORT_USER_CHANGED',
        payload: e.target.value
    }
}