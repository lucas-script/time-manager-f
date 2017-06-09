const INITIAL_STATE = {
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'USER_SEARCHED':
            return { ...state, list: action.payload }

        case 'USER_REMOVED':
            return { ...state }

        default:
            return state
    }
}
