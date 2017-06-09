const INITIAL_STATE = {
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TASK_SEARCHED':
            return { ...state, list: action.payload }

        case 'TASK_REMOVED':
            return { ...state }

        default:
            return state
    }
}
