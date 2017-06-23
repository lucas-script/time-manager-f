import { formatDate } from '../../util/format'

const today = formatDate()

const INITIAL_STATE = {
    name: '',
    date: today,
    durationInMin: 0,
    redirectToList: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TASK_UPDATE_UPDATED':
            return state

        case 'TASK_UPDATE_INITIAL_LOAD':
            return state

        case 'TASK_UPDATE_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'TASK_UPDATE_DATE_CHANGED':
            return { ...state, date: action.payload }

        case 'TASK_UPDATE_DURATION_CHANGED':
            return { ...state, durationInMin: action.payload }

        case 'TASK_UPDATE_REDIRECT':
            return { ...state, redirectToList: true }

        case 'TASK_UPDATE_REDIRECT_RESET':
            return { ...state, redirectToList: false }

        case 'TASK_UPDATE_CLEAR_FORM':
            return { ...state, name: '', date: today,  durationInMin: 0 }

        default:
            return state
    }
}