const INITIAL_STATE = {
    list: [],
    sDate: '',
    eDate: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TASK_SEARCHED':
            return { ...state, list: action.payload }

        case 'TASK_REMOVED':
            return { ...state }

        case 'TASK_LIST_FILTERED':
            console.log('task list filtered')
            return { ...state, list: action.payload }

        case 'TASK_LIST_SDATE_CHANGED':
            return { ...state, sDate: action.payload }

        case 'TASK_LIST_EDATE_CHANGED':
            return { ...state, eDate: action.payload }

        default:
            return state
    }
}
