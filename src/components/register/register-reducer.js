const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    redirectToLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'REGISTER_REGISTERED_USER':
            return { ...state, redirectToLogin: true }

        case 'REGISTER_RESET_REDIRECT':
            return { ...state, redirectToLogin: false }

        case 'REGISTER_NAME_CHANGED':
            return { ...state, name: action.payload }

        case 'REGISTER_EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'REGISTER_PASSWORD_CHANGED':
            return { ...state, password: action.payload }

        case 'REGISTER_CLEAR_FORM':
            return { ...state, name: '', email: '', password: '' }

        case 'REGISTER_REDIRECT':
            return { ...state, redirectToLogin: true }

        case 'REGISTER_RESET_REDIRECT':
            return { ...state, redirectToLogin: false }

        default:
            return state
    }
}
