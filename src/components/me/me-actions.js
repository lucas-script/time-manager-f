import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/me`

export const onUpdate = (n, e, p ,r, changeP, w, we) => {

    const u = {
        name: n,
        email: e,
        password: p,
        changePass: changeP,
        workload: w,
        workloadEnable: we
    }

    console.log(u)

    return dispatch => {
        axios.put(`${URL}`, u)
            .then(res => {
                dispatch({ type: 'ME_UPDATED' })
                toastr.success('Success', 'Profile updated')
            }).catch(err => {
                toastr.error('Error', err.response.data.message)
            })
    }
}

export const onInitialLoad = () => {
    console.log('initial load')
    return dispatch => {
        let r
        axios.get(`${URL}`)
            .then(res => {
                console.log('inside axios')
                r = res.data.data
                dispatch({ type: 'ME_LOAD' })
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
                let workload = (r.workload) ? r.workload: ''
                dispatch(onWorkloadChanged({ target: { value: workload }}))
            })
            .then(res => {
                let workloadEnable = (r.workloadEnable) ? r.workloadEnable : ''
                dispatch(onWorkloadEnableChanged({ target: { checked: workloadEnable }}))
            })
            .catch(err => {
                toastr.error('Error', err.response.data)
        })
    }
}

export const onNameChanged = (e) => {

    console.log('on name changed')
    console.log(e)
    return {
        type: 'ME_NAME_CHANGED',
        payload: e.target.value
    }
}

export const onEmailChanged = (e) => {
    return {
        type: 'ME_EMAIL_CHANGED',
        payload: e.target.value
    }
}

export const onPasswordChanged = (e) => {
    return {
        type: 'ME_PASSWORD_CHANGED',
        payload: e.target.value
    }
}

export const onChangePassChanged = (e) => {
    return {
        type: 'ME_CHANGE_PASS_CHANGED',
        payload: e.target.checked
    }
}

export const onWorkloadChanged = (e) => {
    return {
        type: 'ME_WORKLOAD_CHANGED',
        payload: e.target.value
    }
}

export const onWorkloadEnableChanged = (e) => {
    return {
        type: 'ME_WORKLOAD_ENABLE_CHANGED',
        payload: e.target.checked
    }
}

