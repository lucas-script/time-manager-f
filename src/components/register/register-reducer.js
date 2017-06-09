const INITIAL_STATE = {
    redirectToLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'REGISTER_REGISTERED_USER':
            return { ...state, redirectToLogin: true }

        case 'REGISTER_RESET_REDIRECT':
            return { ...state, redirectToLogin: false }

        default:
            return state
    }
}
