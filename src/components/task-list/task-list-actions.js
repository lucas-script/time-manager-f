import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/tasks`

export const onSearch = () => {
    return dispatch => {
        axios.get(`${URL}`)
            .then(res => {
                dispatch({ type: 'TASK_SEARCHED', payload: res.data.data })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const onRemove = (id) => {
    return dispatch => {
        axios.delete(`${URL}/${id}`)
            .then(res => {
                dispatch({ type: 'TASK_REMOVED' })
                toastr.success('Success', 'Task removed')
            })
            .then(res => {
                dispatch(onSearch())
            })
            .catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const onFilter = (sDate, eDate) => {
    return dispatch => {
        axios.get(`${URL}?sdate=${sDate}&edate=${eDate}`)
            .then(res => {
                dispatch({ type: 'TASK_LIST_FILTERED', payload: res.data.data })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const onSDateChanged = (e) => {
    return {
        type: 'TASK_LIST_SDATE_CHANGED',
        payload: e.target.value
    }
}

export const onEDateChanged = (e) => {
    return {
        type: 'TASK_LIST_EDATE_CHANGED',
        payload: e.target.value
    }
}
