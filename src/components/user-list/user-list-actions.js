import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import config from '../../config'

const BASE_URL = config.API_URL
const URL = `${BASE_URL}/users`

export const onSearch = () => {
    return dispatch => {
        axios.get(`${URL}`)
            .then(res => {
                dispatch({ type: 'USER_SEARCHED', payload: res.data.data })
            }).catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}

export const onRemove = (id) => {
    return dispatch => {
        axios.delete(`${URL}/${id}`)
            .then(res => {
                dispatch({ type: 'USER_REMOVED' })
                toastr.success('Success', 'User removed')
            })
            .then(res => {
                dispatch(onSearch())
            })
            .catch(err => {
                toastr.error('Error', err.response.data)
            })
    }
}
