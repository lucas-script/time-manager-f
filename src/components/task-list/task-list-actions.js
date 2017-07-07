import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { formatDate } from '../../util/format'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/tasks`
const WORKLOADS_URL = `${BASE_URL}/workloads`
const TASKS_SUM_URL = `${BASE_URL}/workloads/tasksSum`

export const onSearch = () => {
    return dispatch => {
        axios.get(`${URL}`)
            .then(res => {
                dispatch({ type: 'TASK_SEARCHED', payload: res.data.data })

            }).catch(err => {
                if (err.response.data) toastr.error('Error', err.response.data)
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

export const loadWorkloads = () => {
    return (dispatch) => {
        axios.get(WORKLOADS_URL)
            .then(res => {
                let wlList = res.data.data
                let wlNewList = []
                wlList.forEach(e => {
                    wlNewList.push({ key:e._id, value: e.workload })
                })
                dispatch({ type: 'TASK_LIST_LOAD_WORKLOADS', payload: wlNewList })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const loadTasksSum = () => {
    return (dispatch) => {
        axios.get(TASKS_SUM_URL)
            .then(res => {
                let tsList = res.data.data
                let tsNewList = []
                tsList.forEach(e => {
                    let u = e._id.user
                    let fmtDt = formatDate(e._id.date)
                    let key = `${u}_${fmtDt}`
                    tsNewList.push({ key: key, value: e.tasksSum })
                })
                dispatch({ type: 'TASK_LIST_LOAD_TASKS_SUM', payload: tsNewList })
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
