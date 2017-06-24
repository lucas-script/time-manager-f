const INITIAL_STATE = {
    list: [],
    sDate: '',
    eDate: '',
    workloadsMap: {},
    tasksSumMap: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TASK_SEARCHED':
            return { ...state, list: action.payload }

        case 'TASK_REMOVED':
            return { ...state }

        case 'TASK_LIST_FILTERED':
            return { ...state, list: action.payload }

        case 'TASK_LIST_SDATE_CHANGED':
            return { ...state, sDate: action.payload }

        case 'TASK_LIST_EDATE_CHANGED':
            return { ...state, eDate: action.payload }

        case 'TASK_LIST_LOAD_WORKLOADS':
            return { ...state, workloadsMap: action.payload }

        case 'TASK_LIST_LOAD_TASKS_SUM':
            return { ...state, tasksSumMap: action.payload }

        default:
            return state
    }
}
